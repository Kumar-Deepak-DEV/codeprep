import React from "react";

function StatCard({
  title,
  value,
  subtitle,
  icon,
  accent = "matrix", // "matrix", "emerald", "amber", "purple", "rose"
  trend,
  className = ""
}) {
  const accentGradients = {
    matrix: "from-[#00FF66]/20 to-transparent text-[#00FF66] border-[#00FF66]/30",
    emerald: "from-emerald-500/20 to-transparent text-emerald-400 border-emerald-500/30",
    amber: "from-amber-500/20 to-transparent text-amber-400 border-amber-500/30",
    purple: "from-purple-500/20 to-transparent text-purple-400 border-purple-500/30",
    rose: "from-rose-500/20 to-transparent text-rose-400 border-rose-500/30",
    blue: "from-cyan-500/20 to-transparent text-cyan-400 border-cyan-500/30"
  };

  const selectedAccent = accentGradients[accent] || accentGradients.matrix;

  return (
    <div
      className={`relative overflow-hidden bg-[#060c08]/90 border border-[#00FF66]/20 rounded-2xl p-5 backdrop-blur-md shadow-xl shadow-black/60 hover:border-[#00FF66]/50 hover:shadow-[0_0_20px_rgba(0,255,102,0.12)] transition-all duration-300 group ${className}`}
    >
      {/* Background neon orb glow */}
      <div
        className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#00FF66] opacity-10 blur-3xl group-hover:opacity-20 transition-opacity"
      />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-xs font-semibold text-[#6ee7b7]/80 uppercase tracking-wider font-mono">
            {title}
          </p>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white mt-1 tracking-tight font-mono">
            {value !== undefined && value !== null ? value : 0}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <div
            className={`p-3 rounded-xl bg-[#09150e] border border-[#00FF66]/30 text-[#00FF66] text-xl flex items-center justify-center shadow-[0_0_12px_rgba(0,255,102,0.15)] group-hover:border-[#00FF66]/60 transition-colors`}
          >
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-[#00FF66]/10 text-xs text-slate-400 flex items-center justify-between relative z-10">
          <span>{trend.label}</span>
          <span className="font-semibold text-[#00FF66] font-mono">{trend.value}</span>
        </div>
      )}
    </div>
  );
}

export default StatCard;
