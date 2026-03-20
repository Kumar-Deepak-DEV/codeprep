const express = require("express");
const router = express.Router();

const protect = require("../../middleware/authMiddleware");
const { getDashboardData } = require("./dashboardController");

router.get("/", protect, getDashboardData);

module.exports = router;
