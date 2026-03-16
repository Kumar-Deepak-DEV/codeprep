import axios from "axios";

export const fetchCodeforcesSolved = async (handle) => {

  try {

    const res = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle}`
    );

    const submissions = res.data.result || [];

    const solvedProblems = [];
    const seen = new Set();

    submissions.forEach((sub) => {

      if (sub.verdict === "OK") {

        const id = `${sub.problem.contestId}${sub.problem.index}`;

        if (!seen.has(id)) {

          seen.add(id);

          solvedProblems.push({
            title: sub.problem.name,
            problemNumber: id,
            platform: "codeforces",
            difficulty: sub.problem.rating || null,
            solvedDate: new Date(sub.creationTimeSeconds * 1000),
            link: `https://codeforces.com/problemset/problem/${sub.problem.contestId}/${sub.problem.index}`
          });

        }

      }

    });

    return solvedProblems;

  } catch (err) {

    console.error("Codeforces fetch error:", err.message);

    return [];

  }

};

export const fetchCodeforcesStats = async (handle) => {
  try {
    const res = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle}`
    );
    const submissions = res.data.result || [];
    
    let easySolved = 0, mediumSolved = 0, hardSolved = 0;
    const seen = new Set();
    
    submissions.forEach(sub => {
      if (sub.verdict === "OK") {
        const id = `${sub.problem.contestId}${sub.problem.index}`;
        if (!seen.has(id)) {
          seen.add(id);
          const rating = sub.problem.rating;
          if (rating) {
            if (rating <= 1200) easySolved++;
            else if (rating <= 1800) mediumSolved++;
            else hardSolved++;
          } else {
            // Unrated problems can default to easy or just not be counted. Let's count them as easy.
            easySolved++;
          }
        }
      }
    });

    let currentRating = 0;
    try {
      const infoRes = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
      if (infoRes.data.result && infoRes.data.result.length > 0) {
        currentRating = infoRes.data.result[0].rating || 0;
      }
    } catch (e) {
      console.error("Codeforces user.info fetch error:", e.message);
    }

    return {
      totalSolved: seen.size,
      easySolved,
      mediumSolved,
      hardSolved,
      rating: currentRating
    };
  } catch (err) {
    console.error("Codeforces stats fetch error:", err.message);
    return null;
  }
};