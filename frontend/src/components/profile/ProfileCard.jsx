import React from "react";
import Card from "../ui/Card";
import { FiUser, FiMail, FiTarget, FiZap, FiCalendar } from "react-icons/fi";

function ProfileCard({ user }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return "-";
    }
  };

  return (
    <Card
      title="User Account Details"
      subtitle="Your authenticated CodePrep profile"
      icon={<FiUser />}
    >
      <div className="flex items-center gap-4 mb-6 pb-5 border-b border-[#00FF66]/15">
        <div className="w-14 h-14 rounded-2xl bg-black border-2 border-[#00FF66] flex items-center justify-center text-[#00FF66] text-xl font-bold font-mono shadow-[0_0_15px_rgba(0,255,102,0.35)]">
          {(user.username || "U").slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">{user.username}</h3>
          <p className="text-xs text-[#6ee7b7]/70 flex items-center gap-1.5 mt-0.5 font-mono">
            <FiMail className="text-[#00FF66]" />
            <span>{user.email}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-[#040906] border border-[#00FF66]/20">
          <span className="text-slate-400 flex items-center gap-1 mb-1 font-mono">
            <FiTarget className="text-[#00FF66]" />
            <span>Daily Goal</span>
          </span>
          <span className="text-base font-bold text-white font-mono">
            {user.dailyGoal || 3} problems/day
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#040906] border border-[#00FF66]/20">
          <span className="text-slate-400 flex items-center gap-1 mb-1 font-mono">
            <FiZap className="text-amber-400" />
            <span>Current Streak</span>
          </span>
          <span className="text-base font-bold text-amber-400 font-mono">
            {user.streak || 0} Days
          </span>
        </div>

        <div className="col-span-2 p-3 rounded-xl bg-[#040906] border border-[#00FF66]/20 flex items-center justify-between font-mono">
          <span className="text-slate-400 flex items-center gap-1">
            <FiCalendar className="text-[#00FF66]" />
            <span>Member Since</span>
          </span>
          <span className="font-semibold text-slate-200">
            {formatDate(user.createdAt)}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default ProfileCard;