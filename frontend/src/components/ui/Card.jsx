import React from "react";

function Card({
  title,
  subtitle,
  action,
  icon,
  children,
  className = "",
  bodyClassName = "",
  headerClassName = "",
  ...props
}) {
  return (
    <div
      className={`bg-[#060c08]/90 border border-[#00FF66]/20 rounded-2xl backdrop-blur-md shadow-xl shadow-black/60 hover:border-[#00FF66]/40 transition-all duration-300 ${className}`}
      {...props}
    >
      {(title || action || icon) && (
        <div
          className={`px-5 py-4 border-b border-[#00FF66]/15 flex items-center justify-between gap-4 ${headerClassName}`}
        >
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-xl bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 text-lg shadow-[0_0_10px_rgba(0,255,102,0.15)]">
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-base font-bold text-white tracking-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-[#6ee7b7]/70 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
      )}
      <div className={`p-5 ${bodyClassName}`}>{children}</div>
    </div>
  );
}

export default Card;
