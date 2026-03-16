import { useState, useEffect, useMemo } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProblemFilters from "../components/problems/ProblemFilters";
import ProblemTable from "../components/problems/ProblemTable";
import Pagination from "../components/common/Pagination";
import { getProblems } from "../services/problemService";

function Problems() {

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [platform, setPlatform] = useState("");
  const [problems, setProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {

    const fetchProblems = async () => {

      try {

        const data = await getProblems();

        setProblems(data);

      } catch (err) {

        console.error("Problems fetch error:", err);

      }

    };

    fetchProblems();

  }, []);

  const filteredProblems = useMemo(() => {

    let result = problems.filter((problem) => {

      const matchesSearch =
        problem.title.toLowerCase().includes(search.toLowerCase()) ||
        problem.problemNumber?.toString().includes(search)

      const matchesDifficulty =
        difficulty === "" || problem.difficulty === difficulty;

      const matchesPlatform =
        platform === "" ||
        (platform === "other"
          ? problem.platform !== "leetcode" && problem.platform !== "codeforces"
          : problem.platform === platform);

      return matchesSearch && matchesDifficulty && matchesPlatform;

    });

    return result;

  }, [problems, search, difficulty, platform]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, difficulty, platform]);

  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = filteredProblems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (

    <DashboardLayout title="Problems">

      <ProblemFilters
        search={search}
        setSearch={setSearch}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        platform={platform}
        setPlatform={setPlatform}
      />

      <ProblemTable problems={paginatedProblems} />

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />

    </DashboardLayout>

  );

}

export default Problems;