const Problem = require("../modules/problems/Problem");
const User = require("../modules/user/User");
const { decrypt } = require("../utils/crypto");

const {
  fetchLeetCodeSolved,
  fetchLeetCodeFullHistory,
  fetchQuestionTopics
} = require("./leetcodeService");

const { fetchCodeforcesSolved } = require("./codeforcesService");

/* Upsert one platform's solved-problem list for a user.
   Uses problemNumber (stable slug/id) as the de-dup key, not title,
   so this is safe to re-run on every sync without creating duplicates. */
async function upsertProblems(userId, platform, problems) {
  for (const p of problems) {
    await Problem.updateOne(
      { userId, platform, problemNumber: p.problemNumber },
      { $set: { ...p, userId } },
      { upsert: true }
    );
  }
}

/* Backfill the `topic` field for LeetCode problems that don't have one yet.
   Only hits the network for problems we haven't tagged before, so repeat
   syncs stay cheap. Runs with light concurrency to avoid hammering LeetCode. */
async function backfillLeetCodeTopics(userId) {
  const untagged = await Problem.find({
    userId,
    platform: "leetcode",
    $or: [{ topic: null }, { topic: "" }, { topic: { $exists: false } }]
  }).limit(50); // cap per sync run so a huge backlog doesn't stall everything

  const CONCURRENCY = 3;
  for (let i = 0; i < untagged.length; i += CONCURRENCY) {
    const batch = untagged.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async (problem) => {
        const topic = await fetchQuestionTopics(problem.problemNumber);
        if (topic) {
          problem.topic = topic;
          await problem.save();
        }
      })
    );
    await new Promise((r) => setTimeout(r, 300));
  }
}

async function syncAllPlatforms(user) {
  if (!user || !user._id) {
    console.log("syncAllPlatforms called without valid user");
    return;
  }

  try {
    if (user.platforms?.leetcode) {
      const fullUser = await User.findById(user._id).select(
        "+leetcodeSession.sessionCookie +leetcodeSession.csrfToken"
      );

      const hasSession =
        fullUser?.leetcodeSession?.sessionCookie &&
        fullUser?.leetcodeSession?.csrfToken &&
        !fullUser.leetcodeSession.invalid;

      let problems;

      if (hasSession) {
        try {
          const sessionCookie = decrypt(fullUser.leetcodeSession.sessionCookie);
          const csrfToken = decrypt(fullUser.leetcodeSession.csrfToken);
          problems = await fetchLeetCodeFullHistory(sessionCookie, csrfToken);
          console.log(`LeetCode full history fetched: ${problems.length}`);

          fullUser.leetcodeSession.lastValidatedAt = new Date();
          fullUser.leetcodeSession.invalid = false;
          await fullUser.save();
        } catch (err) {
          if (err.code === "LEETCODE_SESSION_INVALID") {
            console.warn(
              `LeetCode session invalid for user ${user._id}, falling back to public sync`
            );
            fullUser.leetcodeSession.invalid = true;
            await fullUser.save();
          } else {
            console.error("Full-history sync failed, falling back:", err.message);
          }
          problems = await fetchLeetCodeSolved(user.platforms.leetcode);
        }
      } else {
        problems = await fetchLeetCodeSolved(user.platforms.leetcode);
        console.log(`LeetCode recent-only fetched: ${problems.length}`);
      }

      await upsertProblems(user._id, "leetcode", problems);
      await backfillLeetCodeTopics(user._id);

      await User.updateOne(
        { _id: user._id },
        { $set: { "lastSync.leetcode": new Date() } }
      );
    }

    if (user.platforms?.codeforces) {
      const problems = await fetchCodeforcesSolved(user.platforms.codeforces);
      console.log("Codeforces fetched:", problems.length);

      await upsertProblems(user._id, "codeforces", problems);

      await User.updateOne(
        { _id: user._id },
        { $set: { "lastSync.codeforces": new Date() } }
      );
    }
  } catch (err) {
    console.error("Sync error:", err);
  }
}

module.exports = { syncAllPlatforms };
