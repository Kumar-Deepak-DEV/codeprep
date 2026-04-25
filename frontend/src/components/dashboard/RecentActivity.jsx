import React from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { FiActivity, FiExternalLink, FiClock } from "react-icons/fi";

function RecentActivity({ problems = [] }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    } catch {
      return "";
    }
  };

  return (
    <Card
      title="Recent Activity"
      subtitle="Latest algorithmic submissions streamed from platforms"
      icon={<FiActivity />}
    >
      {problems.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
          <FiClock className="text-3xl mx-auto mb-2 text-[#00FF66]/30" />
          <p className="text-sm font-medium text-slate-300">No recent submissions found</p>
          <p className="text-xs text-[#6ee7b7]/60 mt-1">Connect your profiles to stream solved problems.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-xl bg-[#040906] border border-[#00FF66]/15 hover:border-[#00FF66]/40 hover:bg-[#07130b] transition duration-150"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Badge type="platform" value={problem.platform} size="xs" />
                <span className="text-sm font-medium text-white truncate hover:text-[#00FF66] transition">
                  {problem.title}
                </span>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {problem.difficulty && (
                  <Badge type="difficulty" value={problem.difficulty} size="xs" />
                )}
                {problem.solvedDate && (
                  <span className="text-[11px] text-[#6ee7b7]/70 font-mono hidden sm:inline">
                    {formatDate(problem.solvedDate)}
                  </span>
                )}
                {problem.link && (
                  <a
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-[#00FF66] p-1 transition"
                    title="Open on platform"
                  >
                    <FiExternalLink className="text-xs" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default RecentActivity;