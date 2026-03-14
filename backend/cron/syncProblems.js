const cron = require("node-cron");
const User = require("../models/User");
const Problem = require("../models/Problem");

const fetchLeetCodeSolved = require("../services/leetcodeService");
const fetchCodeforcesSolved = require("../services/codeforcesService");


// LeetCode every 30 min
cron.schedule("*/30 * * * *", async () => {

  const users = await User.find({ "platforms.leetcode": { $exists: true } });

  for (const user of users) {

    const problems = await fetchLeetCodeSolved(
      user.platforms.leetcode,
      user.lastSync?.leetcode
    );

    for (const p of problems) {

      await Problem.updateOne(
        {
          userId: user._id,
          title: p.title,
          platform: "leetcode"
        },
        { $set: p },
        { upsert: true }
      );

    }

    user.lastSync.leetcode = new Date();
    await user.save();
  }

});


// Codeforces every 1 hr
cron.schedule("0 * * * *", async () => {

  const users = await User.find({ "platforms.codeforces": { $exists: true } });

  for (const user of users) {

    const problems = await fetchCodeforcesSolved(
      user.platforms.codeforces,
      user.lastSync?.codeforces
    );

    for (const p of problems) {

      await Problem.updateOne(
        {
          userId: user._id,
          title: p.title,
          platform: "codeforces"
        },
        { $set: p },
        { upsert: true }
      );

    }

    user.lastSync.codeforces = new Date();
    await user.save();
  }

});