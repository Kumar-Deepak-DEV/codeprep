const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getGoals } = require("../controllers/goalsController");

router.get("/", protect, getGoals);

module.exports = router;
