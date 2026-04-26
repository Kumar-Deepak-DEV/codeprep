import React from "react";
import ProblemRow from "./ProblemRow";
import { FiInbox } from "react-icons/fi";

function ProblemTable({ problems = [], onDelete }) {
  if (problems.length === 0) {
    return (
      <div className="bg-[#060c08]/90 border border-[#00FF66]/20 rounded-2xl p-12 text-center">
        <FiInbox className="text-4xl text-[#00FF66]/30 mx-auto mb-3" />
        <h4 className="text-base font-bold text-white">No problems found</h4>
        <p className="text-xs text-[#6ee7b7]/60 mt-1 max-w-sm mx-auto font-mono">
          No records match your filter criteria. Adjust filters or sync connected handles.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#060c08]/90 border border-[#00FF66]/20 rounded-2xl overflow-hidden shadow-xl shadow-black/60">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/60 border-b border-[#00FF66]/20 text-xs font-semibold text-[#00FF66] uppercase tracking-wider font-mono">
              <th className="p-4">Problem Name</th>
              <th className="p-4">Platform</th>
              <th className="p-4">Difficulty</th>
              <th className="p-4">Topics / Tags</th>
              <th className="p-4">Solved Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <ProblemRow
                key={problem._id || problem.problemNumber || problem.title}
                problem={problem}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProblemTable;