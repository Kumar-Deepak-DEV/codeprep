import React from "react";
import Badge from "../ui/Badge";
import { FiExternalLink, FiTrash2 } from "react-icons/fi";

function ProblemRow({ problem, onDelete }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return "-";
    }
  };

  const topicList = (problem.topic || "").split(",").map((t) => t.trim()).filter(Boolean);

  return (
    <tr className="border-b border-[#00FF66]/10 hover:bg-[#00FF66]/[0.03] transition-colors group">
      {/* Problem Title & ID */}
      <td className="p-4">
        <div className="flex items-center gap-2">
          {problem.link ? (
            <a
              href={problem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white hover:text-[#00FF66] flex items-center gap-1.5 transition"
            >
              <span>{problem.title}</span>
              <FiExternalLink className="text-xs text-slate-500 group-hover:text-[#00FF66] transition" />
            </a>
          ) : (
            <span className="text-sm font-semibold text-white">{problem.title}</span>
          )}
        </div>
      </td>

      {/* Platform */}
      <td className="p-4">
        <Badge type="platform" value={problem.platform} />
      </td>

      {/* Difficulty */}
      <td className="p-4">
        {problem.difficulty ? (
          <Badge type="difficulty" value={problem.difficulty} />
        ) : (
          <span className="text-xs text-slate-500">-</span>
        )}
      </td>

      {/* Topics */}
      <td className="p-4">
        <div className="flex items-center gap-1.5 flex-wrap max-w-xs">
          {topicList.length > 0 ? (
            topicList.slice(0, 2).map((t, idx) => (
              <Badge key={idx} type="topic" value={t} size="xs" />
            ))
          ) : (
            <span className="text-xs text-slate-500 font-mono">Uncategorized</span>
          )}
          {topicList.length > 2 && (
            <span className="text-[11px] text-[#6ee7b7]/60 font-mono font-medium">
              +{topicList.length - 2}
            </span>
          )}
        </div>
      </td>

      {/* Solved Date */}
      <td className="p-4 text-xs text-[#a7f3d0]/80 font-mono whitespace-nowrap">
        {formatDate(problem.solvedDate)}
      </td>

      {/* Actions */}
      <td className="p-4 text-right">
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(problem._id)}
            title="Delete record"
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
          >
            <FiTrash2 className="text-sm" />
          </button>
        )}
      </td>
    </tr>
  );
}

export default ProblemRow;