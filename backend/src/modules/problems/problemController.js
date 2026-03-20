const Problem = require("./Problem");

/* Get all problems for logged in user */
exports.getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({
      userId: req.user._id
    }).sort({ solvedDate: -1 });

    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Add problem manually */
exports.addProblem = async (req, res) => {
  try {
    const problem = await Problem.create({
      ...req.body,
      userId: req.user._id
    });

    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Delete problem */
exports.deleteProblem = async (req, res) => {
  try {
    await Problem.deleteOne({
      _id: req.params.id,
      userId: req.user._id
    });

    res.json({ message: "Problem deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
