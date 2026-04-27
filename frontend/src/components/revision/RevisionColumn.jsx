import React, { useState, useEffect } from "react";
import RevisionCard from "./RevisionCard";
import Pagination from "../ui/Pagination";
import { FiClock, FiAlertTriangle, FiCalendar, FiCheck } from "react-icons/fi";

function RevisionColumn({ title, problems = [], type = "upcoming" }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [problems]);

  const totalPages = Math.ceil(problems.length / itemsPerPage);
  const paginatedProblems = problems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getHeaderIcon = () => {
    if (type === "overdue") return <FiAlertTriangle className="text-rose-400" />;
    if (type === "today") return <FiClock className="text-amber-400" />;
    return <FiCalendar className="text-[#00FF66]" />;
  };

  const getBadgeColor = () => {
    if (type === "overdue") return "bg-rose-950/40 text-rose-300 border-rose-500/40";
    if (type === "today") return "bg-amber-950/40 text-amber-300 border-amber-500/40";
    return "bg-[#00FF66]/15 text-[#00FF66] border-[#00FF66]/40 shadow-[0_0_6px_rgba(0,255,102,0.2)]";
  };

  return (
    <div className="bg-[#060c08]/90 border border-[#00FF66]/20 rounded-2xl p-5 backdrop-blur flex flex-col justify-between shadow-xl shadow-black/60 min-h-[500px]">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[#00FF66]/15 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-base">{getHeaderIcon()}</span>
            <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
          </div>
          <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${getBadgeColor()}`}>
            {problems.length}
          </span>
        </div>

        {problems.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <FiCheck className="text-3xl text-[#00FF66]/40 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-300">All clear!</p>
            <p className="text-xs text-[#6ee7b7]/60 mt-0.5 font-mono">No problems in this queue.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {paginatedProblems.map((problem, index) => (
              <RevisionCard key={problem._id || index} problem={problem} />
            ))}
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default RevisionColumn;