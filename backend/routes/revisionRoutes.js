const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getRevision } = require("../controllers/revisionController");

router.get("/", protect, getRevision);

module.exports = router;
