const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const profileController = require("../controllers/profileController");

console.log("protect:", typeof protect);
console.log("getProfile:", typeof profileController.getProfile);
console.log("updatePlatforms:", typeof profileController.updatePlatforms);

router.get("/", protect, profileController.getProfile);
router.put("/platform", protect, profileController.updatePlatforms);

module.exports = router;