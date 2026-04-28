import React from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { FiCalendar, FiCheck, FiMinus } from "react-icons/fi";

function GoalHistory({ history = [] }) {
  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <Card
      title="Consistency Log"
      subtitle="Past 5-day daily goal achievement history"
      icon={<FiCalendar />}
    >
      {history.length === 0 ? (
        <div className="text-center py-10 text-slate-500 text-sm font-mono">
          No historical goal data recorded yet.
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {history.map((item, index) => {
            const isMet = (item.solved || 0) >= (item.goal || 3);
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#040906] border border-[#00FF66]/15 hover:border-[#00FF66]/40 transition"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-xl border text-sm ${
                      isMet
                        ? "bg-[#00FF66]/15 text-[#00FF66] border-[#00FF66]/40 shadow-[0_0_8px_rgba(0,255,102,0.2)]"
                        : "bg-slate-900 text-slate-500 border-slate-800"
                    }`}
                  >
                    {isMet ? <FiCheck /> : <FiMinus />}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white font-mono block">
                      {formatDate(item.date)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span className="text-sm font-bold text-white">
                    {item.solved} <span className="text-slate-500 text-xs font-normal">/ {item.goal}</span>
                  </span>
                  <Badge
                    type="status"
                    value={isMet ? "Goal Met" : "Incomplete"}
                    size="xs"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

export default GoalHistory;