import React from "react";
import { FiCheck, FiClock, FiAlertTriangle, FiTag } from "react-icons/fi";
import { SiLeetcode, SiCodeforces } from "react-icons/si";

function Badge({ type = "default", value, children, size = "sm", className = "" }) {
  const content = children || value;
  const strVal = (typeof content === "string" ? content : "").toLowerCase().trim();

  let styles = "bg-[#06150c] text-[#a7f3d0] border-[#00FF66]/30";
  let icon = null;

  if (type === "matrix" || strVal === "matrix") {
    styles = "bg-black text-[#00FF66] border-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.35)] font-mono";
  } else if (type === "difficulty" || ["easy", "medium", "hard"].includes(strVal)) {
    if (strVal === "easy" || strVal.includes("easy") || (parseInt(strVal) && parseInt(strVal) <= 1200)) {
      styles = "bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/40 shadow-[0_0_8px_rgba(0,255,102,0.15)]";
    } else if (strVal === "medium" || strVal.includes("med") || (parseInt(strVal) && parseInt(strVal) <= 1800)) {
      styles = "bg-amber-500/10 text-amber-300 border-amber-500/30";
    } else if (strVal === "hard" || strVal.includes("hard") || (parseInt(strVal) && parseInt(strVal) > 1800)) {
      styles = "bg-rose-500/10 text-rose-400 border-rose-500/30";
    } else {
      styles = "bg-emerald-950/40 text-emerald-300 border-emerald-500/20";
    }
  } else if (type === "platform" || ["leetcode", "codeforces"].includes(strVal)) {
    if (strVal === "leetcode") {
      styles = "bg-amber-500/10 text-amber-400 border-amber-500/40";
      icon = <SiLeetcode className="text-xs text-[#FFA116]" />;
    } else if (strVal === "codeforces") {
      styles = "bg-blue-500/10 text-blue-400 border-blue-500/40";
      icon = <SiCodeforces className="text-xs text-[#1890ff]" />;
    } else {
      styles = "bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/30";
    }
  } else if (type === "status") {
    if (strVal === "solved" || strVal === "completed" || strVal === "goal met") {
      styles = "bg-[#00FF66]/15 text-[#00FF66] border-[#00FF66]/40 shadow-[0_0_8px_rgba(0,255,102,0.2)]";
      icon = <FiCheck className="text-xs" />;
    } else if (strVal === "overdue") {
      styles = "bg-rose-500/15 text-rose-400 border-rose-500/30";
      icon = <FiAlertTriangle className="text-xs" />;
    } else if (strVal === "today" || strVal === "due today") {
      styles = "bg-amber-500/15 text-amber-300 border-amber-500/30";
      icon = <FiClock className="text-xs" />;
    } else {
      styles = "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      icon = <FiClock className="text-xs" />;
    }
  } else if (type === "topic") {
    styles = "bg-[#071d12] text-[#6ee7b7] border-[#00FF66]/20 hover:border-[#00FF66]/50 transition-colors";
    icon = <FiTag className="text-[10px] text-[#00FF66]" />;
  } else if (type === "weak") {
    styles = "bg-rose-950/40 text-rose-300 border-rose-500/40 animate-pulse";
  }

  const sizeStyles =
    size === "xs"
      ? "text-[11px] px-2 py-0.5 gap-1"
      : size === "lg"
      ? "text-sm px-3.5 py-1.5 gap-2"
      : "text-xs px-2.5 py-1 gap-1.5";

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${styles} ${sizeStyles} ${className}`}
    >
      {icon}
      <span>{content}</span>
    </span>
  );
}

export default Badge;
