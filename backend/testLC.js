const axios = require("axios");

async function testLC() {
  try {
    const res = await axios.post("https://leetcode.com/graphql", {
      query: `
        query getUserProfile($username: String!) {
          recentSubmissionList(username: $username) {
            title
            statusDisplay
            timestamp
          }
        }
      `,
      variables: { username: "neetcode" }
    });
    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    if (err.response) console.log(err.response.data);
    else console.log(err.message);
  }
}
testLC();
