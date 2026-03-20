const express = require("express");
const router = express.Router();

const protect = require("../../middleware/authMiddleware");
const profileController = require("./profileController");

router.get("/", protect, profileController.getProfile);
router.put("/platform", protect, profileController.updatePlatforms);
router.put("/leetcode-session", protect, profileController.connectLeetCodeSession);
router.delete("/leetcode-session", protect, profileController.disconnectLeetCodeSession);

module.exports = router;
