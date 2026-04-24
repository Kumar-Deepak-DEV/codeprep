import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiBook,
  FiRefreshCw,
  FiTarget,
  FiBarChart2,
  FiUser,
  FiZap,
  FiStar
} from "react-icons/fi";

function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FiGrid /> },
    { name: "Problems Explorer", path: "/problems", icon: <FiBook /> },
    { name: "Spaced Revision", path: "/revision", icon: <FiRefreshCw /> },
    { name: "Daily Goals", path: "/goals", icon: <FiTarget /> },
    { name: "Analytics & Topics", path: "/analytics", icon: <FiBarChart2 /> },
    { name: "Profile & Integrations", path: "/profile", icon: <FiUser /> }
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#020504] border-r border-[#00FF66]/20 flex flex-col justify-between shrink-0">
      <div>
        {/* Logo Branding */}
        <div className="p-6 border-b border-[#00FF66]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black border-2 border-[#00FF66] text-[#00FF66] flex items-center justify-center font-extrabold text-sm shadow-[0_0_12px_rgba(0,255,102,0.4)] font-mono">
              &gt;_
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">
                Code<span className="text-[#00FF66] drop-shadow-[0_0_8px_rgba(0,255,102,0.6)]">Prep</span>
              </span>
              <span className="block text-[10px] text-[#6ee7b7]/70 font-semibold font-mono tracking-wider">
                DSA COMPANION
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex flex-col gap-1.5 p-3.5 mt-2">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#00FF66]/15 text-[#00FF66] border border-[#00FF66]/50 shadow-[0_0_15px_rgba(0,255,102,0.2)] font-semibold"
                    : "text-slate-400 hover:text-[#00FF66] hover:bg-[#07150d] border border-transparent"
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Theme Pill Badge at Bottom */}
      <div className="p-4 flex flex-col gap-3">
        {/* Matrix Active Badge */}
        <div className="flex items-center justify-between px-3.5 py-2 rounded-full bg-black border-2 border-[#00FF66] shadow-[0_0_14px_rgba(0,255,102,0.4)]">
          <span className="text-[#00FF66] text-sm leading-none font-bold">☆</span>
          <span className="text-[#00FF66] text-xs font-mono font-semibold tracking-wider">matrix</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00FF66] shadow-[0_0_6px_#00FF66]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#008F39]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#B9FBC0]" />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#060e0a] border border-[#00FF66]/20 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-[#00FF66] font-semibold mb-1 font-mono text-[11px]">
            <FiZap />
            <span>DAILY CONSISTENCY</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Solve 2-3 target problems daily to maintain peak algorithmic momentum.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;