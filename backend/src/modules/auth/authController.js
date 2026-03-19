const bcrypt = require("bcrypt");
const User = require("../user/User");
const generateToken = require("../../utils/generateToken");
const { syncAllPlatforms } = require("../../services/syncService");
const {
  validateLeetCode,
  validateCodeforces
} = require("../../services/platformValidation");

// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, platforms } = req.body;

    const leetcode = platforms?.leetcode;
    const codeforces = platforms?.codeforces;

    if (!leetcode && !codeforces) {
      return res.status(400).json({
        message: "At least one platform (LeetCode or Codeforces) is required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (leetcode) {
      const validLC = await validateLeetCode(leetcode);
      if (!validLC) {
        return res.status(400).json({ message: "Invalid LeetCode username" });
      }
    }

    if (codeforces) {
      const validCF = await validateCodeforces(codeforces);
      if (!validCF) {
        return res.status(400).json({ message: "Invalid Codeforces handle" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      platforms: { leetcode, codeforces }
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        platforms: user.platforms,
        dailyGoal: user.dailyGoal,
        streak: user.streak
      },
      token: generateToken(user._id)
    });

    syncAllPlatforms(user).catch((err) =>
      console.error("Register sync failed:", err)
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        platforms: user.platforms,
        dailyGoal: user.dailyGoal,
        streak: user.streak
      }
    });

    syncAllPlatforms(user).catch((err) =>
      console.error("Login sync failed:", err)
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
