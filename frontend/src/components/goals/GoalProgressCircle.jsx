import React from "react";
import Card from "../ui/Card";
import { FiTarget, FiCheckCircle } from "react-icons/fi";

function GoalProgressCircle({ solved = 0, goal = 3 }) {
  const percentage = goal > 0 ? Math.min((solved / goal) * 100, 100) : 0;
  const isCompleted = percentage >= 100;

  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <Card
      title="Today's Target Progress"
      subtitle="Daily practice commitment"
      icon={<FiTarget />}
    >
      <div className="flex flex-col items-center justify-center py-4">
        <div className="relative">
          <svg width="150" height="150" className="transform -rotate-90">
            {/* background circle */}
            <circle
              cx="75"
              cy="75"
              r={radius}
              stroke="#0f2419"
              strokeWidth="12"
              fill="transparent"
            />
            {/* progress circle */}
            <circle
              cx="75"
              cy="75"
              r={radius}
              stroke={isCompleted ? "#00FF66" : "#10b981"}
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out drop-shadow-[0_0_10px_rgba(0,255,102,0.6)]"
            />
          </svg>

          {/* Centered label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-extrabold text-white tracking-tight font-mono">
              {solved} <span className="text-slate-500 text-lg font-normal">/ {goal}</span>
            </span>
            <span className="text-[11px] font-semibold text-[#00FF66] font-mono">
              PROBLEMS
            </span>
          </div>
        </div>

        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-black border border-[#00FF66]/30 font-mono shadow-[0_0_8px_rgba(0,255,102,0.15)]">
            {isCompleted ? (
              <>
                <FiCheckCircle className="text-[#00FF66] text-sm" />
                <span className="text-[#00FF66]">Daily Goal Achieved!</span>
              </>
            ) : (
              <span className="text-slate-300">
                {Math.round(percentage)}% completed &bull; {Math.max(0, goal - solved)} more to go
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default GoalProgressCircle;