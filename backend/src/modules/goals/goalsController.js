const Problem = require("../problems/Problem");
const User = require("../user/User");

exports.getGoals = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const todaySolved = await Problem.countDocuments({
      userId,
      solvedDate: { $gte: startOfDay }
    });

    const todayGoal = user.dailyGoal || 3;

    const formatLocalDateKey = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const history = [];
    for (let i = 1; i <= 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayStart = new Date(d);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(d);
      dayEnd.setHours(23, 59, 59, 999);

      const count = await Problem.countDocuments({
        userId,
        solvedDate: { $gte: dayStart, $lte: dayEnd }
      });

      history.push({
        date: formatLocalDateKey(d),
        solved: count,
        goal: todayGoal
      });
    }

    res.json({
      today: { solved: todaySolved, goal: todayGoal },
      history
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
