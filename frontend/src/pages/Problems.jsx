import React, { useState, useEffect, useMemo } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProblemFilters from "../components/problems/ProblemFilters";
import ProblemTable from "../components/problems/ProblemTable";
import AddProblemModal from "../components/problems/AddProblemModal";
import Pagination from "../components/ui/Pagination";
import Loader from "../components/ui/Loader";
import SEO from "../components/ui/SEO";
import { getProblems, addProblem, deleteProblem } from "../services/problemService";

function Problems() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [platform, setPlatform] = useState("");
  const [topic, setTopic] = useState("");
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const fetchProblemList = async () => {
    try {
      setLoading(true);
      const data = await getProblems();
      setProblems(data || []);
    } catch (err) {
      console.error("Problems fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblemList();
  }, []);

  // Collect unique topics across all loaded problems
  const topicsList = useMemo(() => {
    const set = new Set();
    problems.forEach((p) => {
      if (p.topic) {
        p.topic.split(",").forEach((t) => {
          const trimmed = t.trim();
          if (trimmed) set.add(trimmed);
        });
      }
    });
    return Array.from(set).sort();
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch =
        search === "" ||
        problem.title?.toLowerCase().includes(search.toLowerCase()) ||
        problem.problemNumber?.toString().toLowerCase().includes(search.toLowerCase());

      const matchesDifficulty =
        difficulty === "" ||
        problem.difficulty?.toLowerCase() === difficulty.toLowerCase();

      const matchesPlatform =
        platform === "" ||
        (platform === "other"
          ? problem.platform !== "leetcode" && problem.platform !== "codeforces"
          : problem.platform?.toLowerCase() === platform.toLowerCase());

      const matchesTopic =
        topic === "" ||
        (problem.topic &&
          problem.topic.toLowerCase().includes(topic.toLowerCase()));

      return matchesSearch && matchesDifficulty && matchesPlatform && matchesTopic;
    });
  }, [problems, search, difficulty, platform, topic]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, difficulty, platform, topic]);

  const handleAddProblem = async (problemData) => {
    const created = await addProblem(problemData);
    setProblems((prev) => [created, ...prev]);
  };

  const handleDeleteProblem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this problem?")) return;
    try {
      await deleteProblem(id);
      setProblems((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete problem error:", err);
      alert("Failed to delete problem.");
    }
  };

  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = filteredProblems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout title="Problems Explorer">
      <SEO
        title="Problems Explorer"
        description="Filter and search all your solved DSA problems across LeetCode, Codeforces, and custom platforms with topic tags and direct links."
      />
      {/* Header Summary */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-400">
          Showing <strong className="text-white">{filteredProblems.length}</strong> of{" "}
          <strong className="text-white">{problems.length}</strong> total solved problems
        </p>
      </div>

      <ProblemFilters
        search={search}
        setSearch={setSearch}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        platform={platform}
        setPlatform={setPlatform}
        topic={topic}
        setTopic={setTopic}
        topicsList={topicsList}
        onOpenAddModal={() => setIsModalOpen(true)}
      />

      {loading ? (
        <Loader text="Loading problems database..." />
      ) : (
        <>
          <ProblemTable
            problems={paginatedProblems}
            onDelete={handleDeleteProblem}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <AddProblemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProblemAdded={handleAddProblem}
      />
    </DashboardLayout>
  );
}

export default Problems;