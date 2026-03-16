const axios = require("axios");

const fetchLeetCodeSolved = async (username) => {
  try {

    // ---------- get stats from API ----------
    const statsRes = await axios.get(
      `https://leetcode-api-pied.vercel.app/user/${username}`
    );

    const statsArray =
      statsRes?.data?.submitStats?.acSubmissionNum || [];

    const statsMap = {};

    for (const item of statsArray) {
      statsMap[item.difficulty] = item.count;
    }

    const totalSolved = statsMap["All"] || 0;
    const easySolved = statsMap["Easy"] || 0;
    const mediumSolved = statsMap["Medium"] || 0;
    const hardSolved = statsMap["Hard"] || 0;

    console.log("Total solved:", totalSolved);
    console.log("Easy:", easySolved);
    console.log("Medium:", mediumSolved);
    console.log("Hard:", hardSolved);


    // ---------- KEEP YOUR GRAPHQL CODE ----------
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
      {
        query,
        variables: { username }
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const submissions =
      res?.data?.data?.recentSubmissionList || [];

    const difficultiesMap = { 1: "Easy", 2: "Medium", 3: "Hard" };
    let globalProblemsMap = new Map();

    try {
      const allProblemsRes = await axios.get("https://leetcode.com/api/problems/all/");
      const pairs = allProblemsRes?.data?.stat_status_pairs || [];
      for (const pair of pairs) {
        if (pair.stat && pair.stat.question__title_slug) {
          globalProblemsMap.set(
            pair.stat.question__title_slug, 
            difficultiesMap[pair.difficulty?.level] || "Unknown"
          );
        }
      }
    } catch (e) {
      console.error("Could not fetch global problems map:", e.message);
    }

    const solvedMap = new Map();

    for (const sub of submissions) {

      if (sub.statusDisplay === "Accepted") {

        if (!solvedMap.has(sub.titleSlug)) {

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

    }

    const solvedProblems = Array.from(solvedMap.values());

    console.log(
      `Imported problems: ${solvedProblems.length} / ${totalSolved}`
    );

    // IMPORTANT: return array (same as before)
    return solvedProblems;

  } catch (err) {

    console.error("LeetCode fetch error:", err.message);
    return [];

  }
};

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
      hardSolved: statsMap["Hard"] || 0,
    };
  } catch (err) {
    console.error("LeetCode stats fetch error:", err.message);
    return {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
    };
  }
};

module.exports = { fetchLeetCodeSolved, fetchLeetCodeStats };