import React from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { FiLayers } from "react-icons/fi";
import { getWeakTopics } from "../../services/recommendationService";

function TopicCoverageTable({ topicCounts = {} }) {
  const topics = getWeakTopics(topicCounts);

  return (
    <Card
      title="DSA Topic Readiness & Gap Analysis"
      subtitle="Coverage measured against standard technical interview benchmarks"
      icon={<FiLayers />}
      className="col-span-1 lg:col-span-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-[#040906] border border-[#00FF66]/15 hover:border-[#00FF66]/40 transition-colors flex flex-col justify-between gap-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white font-mono">{item.topic}</span>
              {item.percent >= 80 ? (
                <span className="text-[11px] font-semibold font-mono px-2 py-0.5 rounded-full bg-[#00FF66]/15 text-[#00FF66] border border-[#00FF66]/40 shadow-[0_0_6px_rgba(0,255,102,0.2)]">
                  Ready
                </span>
              ) : item.percent >= 40 ? (
                <span className="text-[11px] font-semibold font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Practicing
                </span>
              ) : (
                <span className="text-[11px] font-semibold font-mono px-2 py-0.5 rounded-full bg-rose-950/50 text-rose-300 border border-rose-500/40">
                  Needs Focus
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-[#6ee7b7]/70 font-mono mb-1.5">
                <span>{item.current} / {item.benchmark} solved</span>
                <span className="font-bold text-[#00FF66]">{item.percent}%</span>
              </div>
              <div className="w-full bg-black h-2 rounded-full overflow-hidden border border-white/5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.percent < 30
                      ? "bg-rose-500 shadow-[0_0_6px_#f43f5e]"
                      : item.percent < 70
                      ? "bg-amber-400 shadow-[0_0_6px_#fbbf24]"
                      : "bg-[#00FF66] shadow-[0_0_6px_#00FF66]"
                  }`}
                  style={{ width: `${Math.max(4, item.percent)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default TopicCoverageTable;
