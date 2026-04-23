import React from "react";
import { FiTrendingUp, FiAlertCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

function WeakTopicBanner({ weakTopics = [], className = "" }) {
  if (!weakTopics || weakTopics.length === 0) return null;

  const topWeak = weakTopics.slice(0, 3);

  return (
    <div
      className={`p-5 rounded-2xl bg-gradient-to-r from-[#180a0a] via-[#08130c] to-[#040d07] border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.1)] ${className}`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-1 font-mono">
            <FiAlertCircle className="text-base text-rose-400 animate-pulse" />
            <span>TARGET PRACTICE ALERT: UNDER-REPRESENTED TOPICS</span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Your recent problem distributions indicate lower coverage in the following areas. Practice problems from these topics to balance your interview readiness:
          </p>
        </div>

        <Link
          to="/analytics"
          className="text-xs font-mono font-semibold px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition shrink-0 flex items-center gap-1.5"
        >
          <FiTrendingUp />
          <span>View Gap Analysis</span>
        </Link>
      </div>

      {/* Progress Bars for Top Weak Topics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-3 border-t border-white/5">
        {topWeak.map((item, idx) => (
          <div key={idx} className="bg-[#050907] border border-white/10 rounded-xl p-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-white font-mono">{item.topic}</span>
              <span className="text-[#6ee7b7]/80 font-mono text-[11px]">
                {item.current} / {item.benchmark} solved
              </span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  item.percent < 30
                    ? "bg-rose-500 shadow-[0_0_8px_#f43f5e]"
                    : item.percent < 70
                    ? "bg-amber-400 shadow-[0_0_8px_#fbbf24]"
                    : "bg-[#00FF66] shadow-[0_0_8px_#00FF66]"
                }`}
                style={{ width: `${Math.max(5, item.percent)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeakTopicBanner;
