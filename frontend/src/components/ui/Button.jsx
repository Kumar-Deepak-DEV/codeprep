import React from "react";
import { FiLoader } from "react-icons/fi";

function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon = null,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-[#00FF66] hover:bg-[#00e65c] text-black font-bold shadow-[0_0_15px_rgba(0,255,102,0.35)] hover:shadow-[0_0_25px_rgba(0,255,102,0.55)] border border-[#00FF66] focus:ring-[#00FF66]",
    secondary:
      "bg-[#09150e] hover:bg-[#0f2419] text-[#00FF66] border border-[#00FF66]/30 hover:border-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.1)] focus:ring-[#00FF66]",
    outline:
      "bg-transparent hover:bg-[#00FF66]/10 text-[#a7f3d0] border border-[#00FF66]/30 hover:border-[#00FF66] hover:text-[#00FF66] focus:ring-[#00FF66]",
    danger:
      "bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 focus:ring-rose-500",
    success:
      "bg-[#00FF66]/15 hover:bg-[#00FF66]/25 text-[#00FF66] border border-[#00FF66]/40 focus:ring-[#00FF66]",
    ghost:
      "bg-transparent hover:bg-white/5 text-slate-400 hover:text-[#00FF66] border-transparent focus:ring-[#00FF66]"
  };

  const sizeStyles = {
    xs: "text-xs px-2.5 py-1 gap-1.5",
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-5 py-2.5 gap-2.5"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className}`}
      {...props}
    >
      {loading ? (
        <FiLoader className="animate-spin text-sm" />
      ) : (
        icon && <span className="text-sm">{icon}</span>
      )}
      {children}
    </button>
  );
}

export default Button;
