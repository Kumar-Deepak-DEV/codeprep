import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

function Modal({ isOpen, onClose, title, children, footer, maxWidth = "max-w-lg" }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={`relative w-full ${maxWidth} bg-[#060c08] border-2 border-[#00FF66]/40 rounded-2xl shadow-[0_0_40px_rgba(0,255,102,0.15)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#00FF66]/20 bg-[#09150e]/50">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-[#00FF66]">☆</span>
            <span>{title}</span>
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-[#00FF66] p-1.5 rounded-lg hover:bg-[#00FF66]/10 transition cursor-pointer"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#00FF66]/20 bg-black/60">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
