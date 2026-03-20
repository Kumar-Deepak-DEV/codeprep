const User = require("./User");
const { syncAllPlatforms } = require("../../services/syncService");
const { encrypt } = require("../../utils/crypto");

/* GET USER PROFILE */
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* UPDATE PLATFORM HANDLES */
const updatePlatforms = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.platforms = {
      ...user.platforms,
      ...req.body.platforms
    };

    await user.save();

    syncAllPlatforms(user).catch((err) =>
      console.error("Platform update sync failed:", err)
    );

    res.json(user);
  } catch (err) {
    console.error("Platform update error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* CONNECT LEETCODE SESSION */
const connectLeetCodeSession = async (req, res) => {
  try {
    const { sessionCookie, csrfToken } = req.body;

    if (!sessionCookie || !csrfToken) {
      return res.status(400).json({
        message: "Both sessionCookie and csrfToken are required"
      });
    }

    const user = await User.findById(req.user._id).select(
      "+leetcodeSession.sessionCookie +leetcodeSession.csrfToken"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.leetcodeSession = {
      sessionCookie: encrypt(sessionCookie),
      csrfToken: encrypt(csrfToken),
      connectedAt: new Date(),
      lastValidatedAt: null,
      invalid: false
    };

    await user.save();

    syncAllPlatforms(user).catch((err) =>
      console.error("Full-history sync after connect failed:", err)
    );

    res.json({ message: "LeetCode session connected. Full sync started." });
  } catch (err) {
    console.error("Connect session error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* DISCONNECT LEETCODE SESSION */
const disconnectLeetCodeSession = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.leetcodeSession = {
      sessionCookie: null,
      csrfToken: null,
      connectedAt: null,
      lastValidatedAt: null,
      invalid: false
    };
    await user.save();
    res.json({ message: "LeetCode session disconnected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getProfile,
  updatePlatforms,
  connectLeetCodeSession,
  disconnectLeetCodeSession
};
