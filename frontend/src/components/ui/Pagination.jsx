import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1 px-3 py-1.5 bg-[#09150e] hover:bg-[#0f2419] border border-[#00FF66]/30 hover:border-[#00FF66] text-[#00FF66] text-sm font-semibold rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
      >
        <FiChevronLeft className="text-base" />
        <span>Prev</span>
      </button>

      <span className="text-slate-400 text-xs font-mono px-2">
        Page <strong className="text-[#00FF66]">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong>
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1 px-3 py-1.5 bg-[#09150e] hover:bg-[#0f2419] border border-[#00FF66]/30 hover:border-[#00FF66] text-[#00FF66] text-sm font-semibold rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
      >
        <span>Next</span>
        <FiChevronRight className="text-base" />
      </button>
    </div>
  );
}

export default Pagination;
