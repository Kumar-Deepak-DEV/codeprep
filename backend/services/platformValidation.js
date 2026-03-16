const axios = require("axios");

async function validateLeetCode(username) {

  const query = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
    }
  }
  `;

  try {

    const res = await axios.post(
      "https://leetcode.com/graphql",
      {
        query,
        variables: { username }
      }
    );

    return res.data.data.matchedUser !== null;

  } catch {
    return false;
  }

}

async function validateCodeforces(handle) {

  try {

    const res = await axios.get(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );

    return res.data.status === "OK";

  } catch {
    return false;
  }

}

module.exports = {
  validateLeetCode,
  validateCodeforces
};