const Problem = require("../problems/Problem");

exports.getRevision = async (req, res) => {
  try {
    const userId = req.user._id;

    const problems = await Problem.find({ userId });

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);

    const overdue = [];
    const today = [];
    const upcoming = [];

    problems.forEach((p) => {
      if (!p.solvedDate) return;

      // Default revision date: 7 days after solved date if revisionDate is not set
      const revDate =
        p.revisionDate ||
        new Date(new Date(p.solvedDate).getTime() + 7 * 24 * 60 * 60 * 1000);

      if (revDate < todayStart) {
        overdue.push(p);
      } else if (revDate >= todayStart && revDate < tomorrowStart) {
        today.push(p);
      } else {
        const nextWeek = new Date(tomorrowStart);
        nextWeek.setDate(nextWeek.getDate() + 7);
        if (revDate < nextWeek) {
          upcoming.push(p);
        }
      }
    });

    res.json({
      overdue,
      today,
      upcoming
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
