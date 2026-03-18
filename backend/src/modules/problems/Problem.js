const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  // stable identifier (LeetCode titleSlug / Codeforces "contestId+index")
  // used for de-duplication — more reliable than matching on title text
  problemNumber: String,

  title: String,

  platform: String,

  difficulty: String,

  // comma-separated topic/tag names, e.g. "Array,Two Pointers"
  topic: String,

  link: String,

  solvedDate: Date,

  revisionDate: Date,

  notes: String

}, { timestamps: true });

// a given user can only have one record per problem per platform
problemSchema.index(
  { userId: 1, platform: 1, problemNumber: 1 },
  { unique: true, partialFilterExpression: { problemNumber: { $type: "string" } } }
);

module.exports = mongoose.model("Problem", problemSchema);
