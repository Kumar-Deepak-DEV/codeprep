const axios = require("axios");

const difficultiesMap = { 1: "Easy", 2: "Medium", 3: "Hard" };

/* ---------- global problem -> difficulty lookup (cached in-process) ---------- */

let _globalProblemsCache = null;
let _globalProblemsCacheAt = 0;
const GLOBAL_CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

async function getGlobalProblemsMap() {
  const now = Date.now();
  if (_globalProblemsCache && now - _globalProblemsCacheAt < GLOBAL_CACHE_TTL_MS) {
    return _globalProblemsCache;
  }

  const map = new Map();
  try {
    const res = await axios.get("https://leetcode.com/api/problems/all/");
    const pairs = res?.data?.stat_status_pairs || [];
    for (const pair of pairs) {
      if (pair.stat && pair.stat.question__title_slug) {
        map.set(
          pair.stat.question__title_slug,
          difficultiesMap[pair.difficulty?.level] || "Unknown"
        );
      }
    }
    _globalProblemsCache = map;
    _globalProblemsCacheAt = now;
  } catch (e) {
    console.error("Could not fetch global problems map:", e.message);
    return _globalProblemsCache || map;
  }

  return map;
}

/* ---------- topic tags per problem (public, no auth needed) ---------- */

async function fetchQuestionTopics(titleSlug) {
  const query = `
    query questionTopicTags($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        topicTags { name }
      }
    }
  `;

  try {
    const res = await axios.post(
      "https://leetcode.com/graphql",
      { query, variables: { titleSlug } },
      { headers: { "Content-Type": "application/json" } }
    );

    const tags = res?.data?.data?.question?.topicTags || [];
    return tags.map((t) => t.name).join(",");
  } catch (err) {
    console.error(`Topic fetch failed for ${titleSlug}:`, err.message);
    return "";
  }
}

/* ---------- PUBLIC, recent-only sync (no login required) ---------- */

const fetchLeetCodeSolved = async (username) => {
  try {
    const query = `
      query getRecentSubmissions($username: String!) {
        recentSubmissionList(username: $username, limit: 100) {
          title
          titleSlug
          timestamp
          statusDisplay
        }
      }
    `;

    const res = await axios.post(
      "https://leetcode.com/graphql",
      { query, variables: { username } },
      { headers: { "Content-Type": "application/json" } }
    );

    const submissions = res?.data?.data?.recentSubmissionList || [];
    const globalProblemsMap = await getGlobalProblemsMap();

    const solvedMap = new Map();

    for (const sub of submissions) {
      if (sub.statusDisplay === "Accepted" && !solvedMap.has(sub.titleSlug)) {
        solvedMap.set(sub.titleSlug, {
          title: sub.title,
          problemNumber: sub.titleSlug,
          platform: "leetcode",
          difficulty: globalProblemsMap.get(sub.titleSlug) || "Unknown",
          solvedDate: new Date(sub.timestamp * 1000),
          link: `https://leetcode.com/problems/${sub.titleSlug}`
        });
      }
    }

    return Array.from(solvedMap.values());
  } catch (err) {
    console.error("LeetCode fetch error:", err.message);
    return [];
  }
};

/* ---------- FULL HISTORY sync (requires the user's own session) ---------- */

const fetchLeetCodeFullHistory = async (sessionCookie, csrfToken) => {
  const query = `
    query submissionList($offset: Int!, $limit: Int!) {
      submissionList(offset: $offset, limit: $limit) {
        hasNext
        submissions {
          title
          titleSlug
          timestamp
          statusDisplay
        }
      }
    }
  `;

  const limit = 20;
  let offset = 0;
  let hasNext = true;
  const solvedMap = new Map();
  const globalProblemsMap = await getGlobalProblemsMap();

  const MAX_PAGES = 500;
  let pages = 0;

  while (hasNext && pages < MAX_PAGES) {
    let res;
    try {
      res = await axios.post(
        "https://leetcode.com/graphql",
        { query, variables: { offset, limit } },
        {
          headers: {
            "Content-Type": "application/json",
            "Cookie": `LEETCODE_SESSION=${sessionCookie}; csrftoken=${csrfToken}`,
            "x-csrftoken": csrfToken,
            "Referer": "https://leetcode.com"
          }
        }
      );
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        const authErr = new Error("LeetCode session expired or invalid");
        authErr.code = "LEETCODE_SESSION_INVALID";
        throw authErr;
      }
      console.error("LeetCode full-history fetch error:", err.message);
      break;
    }

    const page = res?.data?.data?.submissionList;
    if (!page) break;

    for (const sub of page.submissions) {
      if (sub.statusDisplay === "Accepted" && !solvedMap.has(sub.titleSlug)) {
        solvedMap.set(sub.titleSlug, {
          title: sub.title,
          problemNumber: sub.titleSlug,
          platform: "leetcode",
          difficulty: globalProblemsMap.get(sub.titleSlug) || "Unknown",
          solvedDate: new Date(sub.timestamp * 1000),
          link: `https://leetcode.com/problems/${sub.titleSlug}`
        });
      }
    }

    hasNext = page.hasNext;
    offset += limit;
    pages += 1;

    await new Promise((r) => setTimeout(r, 300));
  }

  return Array.from(solvedMap.values());
};

/* ---------- lightweight stats (Easy/Medium/Hard counts) ---------- */

const fetchLeetCodeStats = async (username) => {
  try {
    const statsRes = await axios.get(
      `https://leetcode-api-pied.vercel.app/user/${username}`
    );

    const statsArray = statsRes?.data?.submitStats?.acSubmissionNum || [];
    const statsMap = {};

    for (const item of statsArray) {
      statsMap[item.difficulty] = item.count;
    }

    return {
      totalSolved: statsMap["All"] || 0,
      easySolved: statsMap["Easy"] || 0,
      mediumSolved: statsMap["Medium"] || 0,
      hardSolved: statsMap["Hard"] || 0
    };
  } catch (err) {
    console.error("LeetCode stats fetch error:", err.message);
    return {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0
    };
  }
};

module.exports = {
  fetchLeetCodeSolved,
  fetchLeetCodeFullHistory,
  fetchLeetCodeStats,
  fetchQuestionTopics
};
