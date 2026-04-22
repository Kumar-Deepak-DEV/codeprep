import React from "react";
import { FiLoader } from "react-icons/fi";

function Loader({ text = "Loading matrix stream...", fullScreen = false, size = "md" }) {
  const sizeMap = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl"
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3 p-8">
      <FiLoader className={`animate-spin text-[#00FF66] ${sizeMap[size] || sizeMap.md} drop-shadow-[0_0_8px_rgba(0,255,102,0.6)]`} />
      {text && <p className="text-xs text-[#6ee7b7]/80 font-mono tracking-wide">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#040806]">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export default Loader;
