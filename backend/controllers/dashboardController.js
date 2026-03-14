const Problem = require("../models/Problem");
const User = require("../models/User");

exports.getDashboardData = async (req, res) => {

  try {

    const userId = req.user._id;

    // total solved
    const totalSolved = await Problem.countDocuments({
      userId
    });

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

    // user info
    const user = await User.findById(userId);

    res.json({
      totalSolved,
      todaySolved,
      dailyGoal: user.dailyGoal,
      streak: user.streak,
      recentProblems
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};