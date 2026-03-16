const Problem = require("../models/Problem");
const User = require("../models/User");
const { fetchLeetCodeStats } = require("../services/leetcodeService");
const { fetchCodeforcesStats } = require("../services/codeforcesService");

exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const problems = await Problem.find({ userId });

    let leetcodeStats = null;
    let codeforcesStats = null;
    let hasLeetcode = false;
    let hasCodeforces = false;

    if (user && user.platforms) {
      if (user.platforms.leetcode) {
        hasLeetcode = true;
        leetcodeStats = await fetchLeetCodeStats(user.platforms.leetcode);
      }
      if (user.platforms.codeforces) {
        hasCodeforces = true;
        codeforcesStats = await fetchCodeforcesStats(user.platforms.codeforces);
      }
    }

    const daysMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekly = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Initialize logic for the past 7 days up to today
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        weekly.push({
            day: daysMap[d.getDay()],
            solved: 0,
            dateKey: d.toISOString().split('T')[0]
        });
    }

    let leetcodeEasy = 0, leetcodeMed = 0, leetcodeHard = 0;
    let cfEasy = 0, cfMed = 0, cfHard = 0;
    
    let platformCounts = {};
    let topicCounts = {};
    
    problems.forEach(p => {
        // compute weekly progress
        if (p.solvedDate) {
            const solvedKey = new Date(p.solvedDate).toISOString().split('T')[0];
            const weekDay = weekly.find(w => w.dateKey === solvedKey);
            if (weekDay) weekDay.solved++;
        }

        // compute difficulty
        if (p.difficulty) {
            const d = p.difficulty.toString().toLowerCase();
            const isCodeforces = p.platform === "codeforces";
            
            if (isCodeforces) {
                if (!isNaN(d)) {
                    const rating = parseInt(d);
                    if (rating <= 1200) cfEasy++;
                    else if (rating <= 1800) cfMed++;
                    else cfHard++;
                } else {
                    cfEasy++; // Unrated or string
                }
            } else {
                if (d === 'easy') leetcodeEasy++;
                else if (d === 'medium') leetcodeMed++;
                else if (d === 'hard') leetcodeHard++;
            }
        }

        // compute platform
        if (p.platform) {
            platformCounts[p.platform] = (platformCounts[p.platform] || 0) + 1;
        }

        // compute topics
        if (p.topic) {
            topicCounts[p.topic] = (topicCounts[p.topic] || 0) + 1;
        }
    });

    if (leetcodeStats && leetcodeStats.totalSolved > 0) {
      leetcodeEasy += leetcodeStats.easySolved;
      leetcodeMed += leetcodeStats.mediumSolved;
      leetcodeHard += leetcodeStats.hardSolved;
      platformCounts["leetcode"] = leetcodeStats.totalSolved;
    }

    if (codeforcesStats && codeforcesStats.totalSolved > 0) {
      cfEasy += codeforcesStats.easySolved;
      cfMed += codeforcesStats.mediumSolved;
      cfHard += codeforcesStats.hardSolved;
      platformCounts["codeforces"] = codeforcesStats.totalSolved;
    }

    const leetcodeDifficulty = [
        { name: "Easy", value: leetcodeEasy },
        { name: "Medium", value: leetcodeMed },
        { name: "Hard", value: leetcodeHard }
    ];

    const codeforcesDifficulty = [
        { name: "Easy (≤1200)", value: cfEasy },
        { name: "Medium (1301-1800)", value: cfMed },
        { name: "Hard (>1800)", value: cfHard }
    ];

    const platform = Object.keys(platformCounts).map(k => ({ platform: k, solved: platformCounts[k] }));
    const topics = Object.keys(topicCounts).map(k => ({ topic: k, count: topicCounts[k] }));

    res.json({
        weekly,
        leetcodeDifficulty,
        codeforcesDifficulty,
        platform,
        topics,
        leetcodeStats,
        codeforcesStats,
        hasLeetcode,
        hasCodeforces
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
