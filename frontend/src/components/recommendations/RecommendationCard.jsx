import React, { useState } from "react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { FiExternalLink, FiCheck, FiBookmark, FiSkipForward, FiHelpCircle } from "react-icons/fi";
import {
  markRecommendationCompleted,
  markRecommendationSkipped,
  toggleBookmarkProblem
} from "../../services/recommendationService";

function RecommendationCard({ problem, onAction, className = "" }) {
  const [completed, setCompleted] = useState(false);
  const [bookmarked, setBookmarked] = useState(Boolean(problem.isBookmarked));

  const handleComplete = () => {
    markRecommendationCompleted(problem.id);
    setCompleted(true);
    if (onAction) onAction("completed", problem);
  };

  const handleSkip = () => {
    markRecommendationSkipped(problem.id);
    if (onAction) onAction("skipped", problem);
  };

  const handleBookmark = () => {
    const isSaved = toggleBookmarkProblem(problem.id);
    setBookmarked(isSaved);
    if (onAction) onAction("bookmarked", problem);
  };

  if (completed) {
    return (
      <div className="p-4 rounded-2xl bg-[#00FF66]/10 border border-[#00FF66]/30 flex items-center justify-between text-[#00FF66]">
        <div className="flex items-center gap-2 text-sm font-semibold font-mono">
          <FiCheck className="text-lg" />
          <span>Completed: {problem.title}</span>
        </div>
        <Badge type="status" value="Solved" />
      </div>
    );
  }

  const topicList = (problem.topic || "").split(",").map((t) => t.trim()).filter(Boolean);

  return (
    <div
      className={`relative p-5 rounded-2xl bg-[#060c08]/90 border border-[#00FF66]/20 hover:border-[#00FF66]/50 hover:shadow-[0_0_20px_rgba(0,255,102,0.12)] transition-all duration-200 flex flex-col justify-between gap-4 group ${
        problem.isWeak ? "ring-1 ring-rose-500/30" : ""
      } ${className}`}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge type="platform" value={problem.platform} />
            <Badge type="difficulty" value={problem.difficulty} />
            {problem.isWeak && (
              <span className="text-[11px] font-semibold font-mono px-2 py-0.5 rounded-full bg-rose-950/50 text-rose-300 border border-rose-500/40">
                Focus Area
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleBookmark}
            title={bookmarked ? "Saved for later" : "Bookmark problem"}
            className={`p-1.5 rounded-xl border transition cursor-pointer ${
              bookmarked
                ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                : "bg-[#09150e] text-slate-400 hover:text-[#00FF66] border-[#00FF66]/20 hover:border-[#00FF66]/40"
            }`}
          >
            <FiBookmark className="text-sm" />
          </button>
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-white group-hover:text-[#00FF66] transition tracking-tight">
          {problem.title}
        </h4>

        {/* Topic tags */}
        <div className="flex items-center gap-1.5 flex-wrap mt-2">
          {topicList.slice(0, 3).map((t, idx) => (
            <Badge key={idx} type="topic" value={t} size="xs" />
          ))}
        </div>

        {/* Personalized Rationale */}
        {problem.reason && (
          <div className="mt-3 p-2.5 rounded-xl bg-[#040906] border border-[#00FF66]/15 text-xs text-[#a7f3d0] flex items-start gap-2">
            <FiHelpCircle className="text-[#00FF66] text-sm mt-0.5 shrink-0" />
            <span>{problem.reason}</span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#00FF66]/15">
        <a
          href={problem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00FF66] hover:text-[#6ee7b7] hover:underline font-mono"
        >
          <span>Solve Problem</span>
          <FiExternalLink className="text-xs" />
        </a>

        <div className="flex items-center gap-2">
          <Button
            size="xs"
            variant="ghost"
            onClick={handleSkip}
            title="Skip this recommendation"
          >
            <FiSkipForward className="text-xs mr-1" />
            <span>Skip</span>
          </Button>

          <Button
            size="xs"
            variant="primary"
            onClick={handleComplete}
          >
            <FiCheck className="text-xs mr-1" />
            <span>Mark Done</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RecommendationCard;
