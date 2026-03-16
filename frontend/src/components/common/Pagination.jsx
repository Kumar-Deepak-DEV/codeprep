import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 bg-[#0f172a] hover:bg-white/5 border border-white/10 text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Prev
      </button>
      <span className="text-gray-400 text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 bg-[#0f172a] hover:bg-white/5 border border-white/10 text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
