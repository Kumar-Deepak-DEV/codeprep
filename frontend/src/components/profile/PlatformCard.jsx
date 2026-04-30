import React from "react";
import Card from "../ui/Card";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import { FiExternalLink, FiCheckCircle, FiXCircle } from "react-icons/fi";

function PlatformCard({ platform = "LeetCode", handle = "", lastSync = null }) {
  const isLeetCode = platform.toLowerCase().includes("leetcode");
  const isConnected = Boolean(handle);

  const getProfileLink = () => {
    if (!handle) return null;
    if (isLeetCode) return `https://leetcode.com/u/${handle}/`;
    return `https://codeforces.com/profile/${handle}`;
  };

  const link = getProfileLink();

  return (
    <Card
      title={`${platform} Integration`}
      icon={
        isLeetCode ? (
          <SiLeetcode className="text-[#FFA116]" />
        ) : (
          <SiCodeforces className="text-[#1890ff]" />
        )
      }
      action={
        <span
          className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
            isConnected
              ? "bg-[#00FF66]/15 text-[#00FF66] border-[#00FF66]/40 shadow-[0_0_6px_rgba(0,255,102,0.2)]"
              : "bg-slate-900 text-slate-500 border-slate-800"
          }`}
        >
          {isConnected ? <FiCheckCircle /> : <FiXCircle />}
          <span>{isConnected ? "Connected" : "Disconnected"}</span>
        </span>
      }
    >
      <div className="flex flex-col gap-3">
        <div>
          <span className="text-xs text-slate-400 font-mono block mb-1">Registered Handle:</span>
          {isConnected ? (
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white font-mono tracking-tight">{handle}</span>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-[#00FF66] p-1 transition"
                  title="View Public Profile"
                >
                  <FiExternalLink className="text-xs" />
                </a>
              )}
            </div>
          ) : (
            <span className="text-sm font-medium text-slate-500 font-mono">Not configured yet</span>
          )}
        </div>

        {lastSync && (
          <div className="text-[11px] text-[#6ee7b7]/60 font-mono pt-3 border-t border-[#00FF66]/10">
            Last synced: {new Date(lastSync).toLocaleString()}
          </div>
        )}
      </div>
    </Card>
  );
}

export default PlatformCard;