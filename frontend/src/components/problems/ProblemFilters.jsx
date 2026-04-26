import React from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import Button from "../ui/Button";

function ProblemFilters({
  search,
  setSearch,
  difficulty,
  setDifficulty,
  platform,
  setPlatform,
  topic,
  setTopic,
  topicsList = [],
  onOpenAddModal
}) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
      {/* Filters group */}
      <div className="flex items-center gap-3 flex-1 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#00FF66] text-sm" />
          <input
            type="text"
            placeholder="Search problem title or number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#050d08] border border-[#00FF66]/25 focus:border-[#00FF66] focus:shadow-[0_0_12px_rgba(0,255,102,0.25)] pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-[#6ee7b7]/40 outline-none transition font-mono"
          />
        </div>

        {/* Platform */}
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="bg-[#050d08] border border-[#00FF66]/25 focus:border-[#00FF66] text-[#a7f3d0] text-sm px-3.5 py-2.5 rounded-xl outline-none transition cursor-pointer font-mono"
        >
          <option value="">All Platforms</option>
          <option value="leetcode">LeetCode</option>
          <option value="codeforces">Codeforces</option>
          <option value="other">Other / Manual</option>
        </select>

        {/* Difficulty */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="bg-[#050d08] border border-[#00FF66]/25 focus:border-[#00FF66] text-[#a7f3d0] text-sm px-3.5 py-2.5 rounded-xl outline-none transition cursor-pointer font-mono"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* Topic */}
        {topicsList.length > 0 && (
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-[#050d08] border border-[#00FF66]/25 focus:border-[#00FF66] text-[#a7f3d0] text-sm px-3.5 py-2.5 rounded-xl outline-none transition cursor-pointer max-w-[160px] font-mono"
          >
            <option value="">All Topics</option>
            {topicsList.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Add Problem Button */}
      {onOpenAddModal && (
        <Button
          variant="primary"
          icon={<FiPlus />}
          onClick={onOpenAddModal}
          className="shrink-0"
        >
          <span>Log Problem</span>
        </Button>
      )}
    </div>
  );
}

export default ProblemFilters;