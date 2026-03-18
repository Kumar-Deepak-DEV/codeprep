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

  // Encrypted LeetCode session, used only for full-history sync.
  // Never returned to the client — fields use select:false.
  leetcodeSession: {
    sessionCookie: {
      type: String,
      default: null,
      select: false
    },
    csrfToken: {
      type: String,
      default: null,
      select: false
    },
    connectedAt: {
      type: Date,
      default: null
    },
    lastValidatedAt: {
      type: Date,
      default: null
    },
    // set true if a sync call gets a 401/403, so the UI can prompt
    // the user to reconnect instead of silently failing forever
    invalid: {
      type: Boolean,
      default: false
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
