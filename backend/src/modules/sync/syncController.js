const User = require("../user/User");
const { syncAllPlatforms } = require("../../services/syncService");

/* POST /api/sync — trigger an on-demand sync for the logged-in user. */
const triggerSync = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.platforms?.leetcode && !user.platforms?.codeforces) {
      return res.status(400).json({
        message: "Connect a LeetCode or Codeforces handle before syncing"
      });
    }

    syncAllPlatforms(user).catch((err) =>
      console.error("Manual sync failed:", err)
    );

    res.json({ message: "Sync started" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { triggerSync };
