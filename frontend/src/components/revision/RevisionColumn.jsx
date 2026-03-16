import { useState, useEffect } from "react";
import RevisionCard from "./RevisionCard";
import Pagination from "../common/Pagination";

function RevisionColumn({ title, problems }) {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    setCurrentPage(1);
  }, [problems]);

  const totalPages = Math.ceil(problems.length / itemsPerPage);
  const paginatedProblems = problems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (

    <div className="bg-[#0f172a] border border-white/10 rounded-xl p-4">

      <h2 className="text-white font-semibold mb-4">
        {title}
      </h2>

      <div className="flex flex-col gap-3">

        {paginatedProblems.map((problem, index) => (

          <RevisionCard key={index} problem={problem} />

        ))}

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