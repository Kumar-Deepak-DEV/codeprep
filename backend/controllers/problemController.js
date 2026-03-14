const Problem = require("../models/Problem");

exports.getProblems = async (req, res) => {
  try {

    const problems = await Problem.find({
      userId: req.params.userId
    });

    res.json(problems);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.addProblem = async (req, res) => {
  try {

    const problem = await Problem.create(req.body);

    res.json(problem);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteProblem = async (req, res) => {
  try {

    await Problem.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};