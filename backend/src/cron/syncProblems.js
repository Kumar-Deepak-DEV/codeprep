const cron = require("node-cron");
const User = require("../modules/user/User");
const { syncAllPlatforms } = require("../services/syncService");

/* Every 30 minutes: sync all connected users */
cron.schedule("*/30 * * * *", async () => {
  console.log("Running scheduled sync...");

  const users = await User.find({
    $or: [
      { "platforms.leetcode": { $ne: null } },
      { "platforms.codeforces": { $ne: null } }
    ]
  });

  for (const user of users) {
    try {
      await syncAllPlatforms(user);
    } catch (err) {
      console.error(`Scheduled sync failed for user ${user._id}:`, err.message);
    }
  }

  console.log(`Scheduled sync complete for ${users.length} user(s).`);
});
