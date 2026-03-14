const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  platforms: {
    leetcode: {
      type: String,
      default: null
    },
    codeforces: {
      type: String,
      default: null
    }
  },

  lastSync: {
    leetcode: Date,
    codeforces: Date
  },

  dailyGoal: {
    type: Number,
    default: 3
  },

  streak: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);