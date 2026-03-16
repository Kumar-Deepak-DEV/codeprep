const Problem = require("./models/Problem");

const { fetchLeetCodeSolved } = require("./services/leetcodeService");
const { fetchCodeforcesSolved } = require("./services/codeforcesService");

async function syncAllPlatforms(user) {

  if (!user || !user._id) {
    console.log("syncAllPlatforms called without valid user");
    return;
  }

  console.log("Running sync for user:", user.platforms);

  try {

    if (user.platforms?.leetcode) {

      const problems = await fetchLeetCodeSolved(user.platforms.leetcode);

      console.log("LeetCode fetched:", problems.length);

      for (const p of problems) {

        await Problem.updateOne(
          {
            userId: user._id,
            title: p.title,
            platform: "leetcode"
          },
          {
            $set: {
              ...p,
              userId: user._id
            }
          },
          { upsert: true }
        );

      }

    }

    if (user.platforms?.codeforces) {

      const problems = await fetchCodeforcesSolved(user.platforms.codeforces);

      console.log("Codeforces fetched:", problems.length);

      for (const p of problems) {

        await Problem.updateOne(
          {
            userId: user._id,
            title: p.title,
            platform: "codeforces"
          },
          {
            $set: {
              ...p,
              userId: user._id
            }
          },
          { upsert: true }
        );

      }

    }

  } catch (err) {
    console.error("Sync error:", err);
  }

}

module.exports = { syncAllPlatforms };