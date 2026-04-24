import React, { useContext } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "../ui/Button";

function Topbar({ title = "Dashboard" }) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (setUser) setUser(null);
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-[#00FF66]/20 bg-[#020504]/90 backdrop-blur-md sticky top-0 z-40">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <span className="text-[#00FF66] font-mono text-sm">&gt;</span>
          <span>{title}</span>
        </h1>
      </div>

      {/* Right Controls & Profile Actions */}
      <div className="flex items-center gap-4">
        {user && (
          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#09150e] border border-[#00FF66]/30 text-xs text-slate-300 shadow-[0_0_10px_rgba(0,255,102,0.1)]">
            <div className="w-5 h-5 rounded-full bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40 flex items-center justify-center font-bold text-[10px] font-mono">
              {(user.username || "U").slice(0, 1).toUpperCase()}
            </div>
            <span className="font-semibold text-white font-mono">{user.username}</span>
          </div>
        )}

        <Button
          variant="danger"
          size="xs"
          icon={<FiLogOut />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}

export default Topbar;