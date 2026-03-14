const fetchLeetCodeSolved = require("./platforms/leetcodeService");
const fetchCodeforcesSolved = require("./platforms/codeforcesService");

async function fetchAllPlatforms(user) {

  let problems = [];

  if (user.platforms.leetcode) {

    const lcProblems = await fetchLeetCodeSolved(
      user.platforms.leetcode
    );

    problems.push(...lcProblems);
  }

  if (user.platforms.codeforces) {

    const cfProblems = await fetchCodeforcesSolved(
      user.platforms.codeforces
    );

    problems.push(...cfProblems);
  }

  return problems;
}

module.exports = fetchAllPlatforms;