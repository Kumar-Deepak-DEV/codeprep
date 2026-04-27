import React from "react";
import Badge from "../ui/Badge";
import { FiExternalLink, FiClock } from "react-icons/fi";

function RevisionCard({ problem }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    } catch {
      return "";
    }
  };

  const getDaysAgo = (dateStr) => {
    if (!dateStr) return "";
    const diffTime = Math.abs(new Date() - new Date(dateStr));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays}d ago`;
  };

  const topicList = (problem.topic || "").split(",").map((t) => t.trim()).filter(Boolean);

  return (
    <div className="p-4 rounded-2xl bg-[#040906] border border-[#00FF66]/15 hover:border-[#00FF66]/40 transition duration-200 flex flex-col gap-2.5 group">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge type="platform" value={problem.platform} size="xs" />
          {problem.difficulty && (
            <Badge type="difficulty" value={problem.difficulty} size="xs" />
          )}
        </div>
        {problem.link && (
          <a
            href={problem.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-[#00FF66] p-0.5 transition"
            title="Open problem"
          >
            <FiExternalLink className="text-xs" />
          </a>
        )}
      </div>

      <h4 className="text-sm font-bold text-white group-hover:text-[#00FF66] transition leading-snug">
        {problem.title}
      </h4>

      {topicList.length > 0 && (
        <div className="flex items-center gap-1 flex-wrap">
          {topicList.slice(0, 2).map((t, idx) => (
            <Badge key={idx} type="topic" value={t} size="xs" />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-[#00FF66]/10 text-[11px] text-[#6ee7b7]/60 font-mono">
        <span className="flex items-center gap-1">
          <FiClock className="text-[#00FF66]" />
          <span>Solved {getDaysAgo(problem.solvedDate)}</span>
        </span>
        {problem.revisionDate && (
          <span className="text-slate-400">
            Due: {formatDate(problem.revisionDate)}
          </span>
        )}
      </div>
    </div>
  );
}

export default RevisionCard;