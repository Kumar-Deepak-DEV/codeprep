const Problem = require("../models/Problem");
const User = require("../models/User");
const { fetchLeetCodeStats } = require("../services/leetcodeService");
const { fetchCodeforcesStats } = require("../services/codeforcesService");

exports.getDashboardData = async (req, res) => {

  try {

    const userId = req.user._id;
    const user = await User.findById(userId);

    let leetcodeStats = null;
    let codeforcesStats = null;

    if (user && user.platforms) {
      if (user.platforms.leetcode) {
        leetcodeStats = await fetchLeetCodeStats(user.platforms.leetcode);
      }
      if (user.platforms.codeforces) {
        codeforcesStats = await fetchCodeforcesStats(user.platforms.codeforces);
      }
    }

    const dbLeetcodeCount = await Problem.countDocuments({
      userId,
      platform: "leetcode"
    });

    const dbCodeforcesCount = await Problem.countDocuments({
      userId,
      platform: "codeforces"
    });

    const dbTotalSolved = await Problem.countDocuments({
      userId
    });

    let totalSolved = dbTotalSolved;

    if (leetcodeStats && leetcodeStats.totalSolved > 0) {
      totalSolved = totalSolved - dbLeetcodeCount + leetcodeStats.totalSolved;
    }

    if (codeforcesStats && codeforcesStats.totalSolved > 0) {
      totalSolved = totalSolved - dbCodeforcesCount + codeforcesStats.totalSolved;
    }

    // today's solved
    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0);

    const todaySolved = await Problem.countDocuments({
      userId,
      solvedDate: { $gte: startOfDay }
    });

    // recent problems
    const recentProblems = await Problem.find({
      userId
    })
    .sort({ solvedDate: -1 })
    .limit(5)
    .select("title platform difficulty solvedDate");

    res.json({
      totalSolved,
      todaySolved,
      dailyGoal: user.dailyGoal,
      streak: user.streak,
      recentProblems,
      leetcodeStats,
      codeforcesStats
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};