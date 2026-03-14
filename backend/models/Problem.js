const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  problemNumber: Number,

  title: String,

  platform: String,

  difficulty: String,

  topic: String,

  link: String,

  solvedDate: Date,

  revisionDate: Date,

  notes: String

}, { timestamps: true });

module.exports = mongoose.model("Problem", problemSchema);