import React, { useState, useMemo } from "react";
import RecommendationCard from "./RecommendationCard";
import Card from "../ui/Card";
import { FiCompass, FiRefreshCw, FiBookOpen } from "react-icons/fi";
import { getRecommendations } from "../../services/recommendationService";

function RecommendationsSection({
  solvedProblems = [],
  topicCounts = {},
  title = "Recommended Practice",
  subtitle = "Personalized problem suggestions to target your DSA growth",
  limit = 4,
  className = ""
}) {
  const [filter, setFilter] = useState("all"); // "all", "Easy", "Medium", "Hard", "weak"
  const [refreshKey, setRefreshKey] = useState(0);

  const recommendations = useMemo(() => {
    return getRecommendations(solvedProblems, topicCounts, limit + 4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solvedProblems, topicCounts, refreshKey]);

  const filtered = useMemo(() => {
    if (filter === "all") return recommendations.slice(0, limit);
    if (filter === "weak") return recommendations.filter((p) => p.isWeak).slice(0, limit);
    return recommendations.filter((p) => p.difficulty === filter).slice(0, limit);
  }, [recommendations, filter, limit]);

  const handleAction = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Card
      title={title}
      subtitle={subtitle}
      icon={<FiCompass />}
      className={className}
      action={
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setRefreshKey((k) => k + 1)}
            className="p-1.5 text-xs text-slate-400 hover:text-[#00FF66] hover:bg-[#00FF66]/10 rounded-xl border border-transparent hover:border-[#00FF66]/30 transition cursor-pointer flex items-center gap-1 font-mono"
            title="Refresh recommendations"
          >
            <FiRefreshCw className="text-xs" />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <div className="flex items-center bg-black/80 p-0.5 rounded-xl border border-[#00FF66]/30 text-xs font-mono">
            {["all", "weak", "Easy", "Medium", "Hard"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
                  filter === f
                    ? "bg-[#00FF66] text-black font-bold shadow-[0_0_8px_rgba(0,255,102,0.4)]"
                    : "text-slate-400 hover:text-[#00FF66]"
                }`}
              >
                {f === "all" ? "All" : f === "weak" ? "Weak Areas" : f}
              </button>
            ))}
          </div>
        </div>
      }
    >
      {filtered.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          <FiBookOpen className="text-3xl mx-auto mb-2 text-[#00FF66]/40" />
          <p className="text-sm font-medium text-slate-200">All caught up on recommendations for this filter!</p>
          <p className="text-xs text-[#6ee7b7]/60 mt-1 font-mono">Try another filter or click Refresh.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((problem) => (
            <RecommendationCard
              key={problem.id}
              problem={problem}
              onAction={handleAction}
            />
          ))}
        </div>
      )}
    </Card>
  );
}

export default RecommendationsSection;
