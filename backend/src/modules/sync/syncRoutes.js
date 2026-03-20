const express = require("express");
const router = express.Router();

const protect = require("../../middleware/authMiddleware");
const { triggerSync } = require("./syncController");

router.post("/", protect, triggerSync);

module.exports = router;
