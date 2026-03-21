const express = require("express");
const router = express.Router();

const authRoutes = require("../modules/auth/authRoutes");
const dashboardRoutes = require("../modules/dashboard/dashboardRoutes");
const problemRoutes = require("../modules/problems/problemRoutes");
const revisionRoutes = require("../modules/revision/revisionRoutes");
const goalsRoutes = require("../modules/goals/goalsRoutes");
const analyticsRoutes = require("../modules/analytics/analyticsRoutes");
const profileRoutes = require("../modules/user/profileRoutes");
const syncRoutes = require("../modules/sync/syncRoutes");

router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/problems", problemRoutes);
router.use("/revision", revisionRoutes);
router.use("/goals", goalsRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/profile", profileRoutes);
router.use("/sync", syncRoutes);

module.exports = router;
