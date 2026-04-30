import React, { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { connectLeetCodeSession } from "../../services/profileService";
import { SiLeetcode } from "react-icons/si";
import { FiShield, FiHelpCircle, FiKey, FiCheckCircle } from "react-icons/fi";

function LeetCodeSessionModal({ isOpen, onClose, username = "", onConnected }) {
  const [sessionCookie, setSessionCookie] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sessionCookie.trim() || !csrfToken.trim()) {
      setError("Please fill in both session cookie and CSRF token.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await connectLeetCodeSession({
        sessionCookie: sessionCookie.trim(),
        csrfToken: csrfToken.trim()
      });
      setSuccess(true);
      setTimeout(() => {
        if (onConnected) onConnected();
        onClose();
      }, 1500);
    } catch (err) {
      console.error("Failed to connect session:", err);
      setError(
        err.response?.data?.message ||
        "Connection failed. Please verify the cookie values and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Unlock Full LeetCode Solve History"
      maxWidth="max-w-xl"
      footer={
        success ? null : (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
              disabled={loading}
            >
              Skip for Now
            </Button>
            <Button
              variant="primary"
              size="sm"
              loading={loading}
              onClick={handleSubmit}
              disabled={!sessionCookie.trim() || !csrfToken.trim()}
              icon={<FiKey />}
            >
              Encrypt & Connect
            </Button>
          </>
        )
      }
    >
      {success ? (
        <div className="py-8 text-center flex flex-col items-center gap-3">
          <FiCheckCircle className="text-5xl text-emerald-400 animate-bounce" />
          <h4 className="text-lg font-bold text-white">Full History Connected!</h4>
          <p className="text-xs text-slate-400 max-w-sm">
            Your session tokens have been encrypted with AES-256-GCM. We are importing all your historical solved problems in the background.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Header Banner */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FFA116]/10 border border-[#FFA116]/30">
            <SiLeetcode className="text-[#FFA116] text-2xl shrink-0" />
            <div className="text-xs text-slate-200 leading-relaxed">
              Hey <strong className="text-[#FFA116]">{username || "there"}</strong>! LeetCode's public API is limited to only the <strong>latest 15 submissions</strong>. Connect your session to import your <strong>entire solve history</strong> and unlock full DSA topic analytics.
            </div>
          </div>

          {/* Security & Encryption Guarantee */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
            <FiShield className="text-emerald-400 text-lg mt-0.5 shrink-0" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-emerald-400">100% Fully Encrypted & Safe:</strong> Your cookies are encrypted using military-grade <strong>AES-256-GCM</strong> before being stored in our database. We only use them in read-only mode to pull your solved problem records.
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
              {error}
            </div>
          )}

          {/* Cookie Inputs */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              LEETCODE_SESSION Cookie *
            </label>
            <input
              type="password"
              placeholder="Paste your LEETCODE_SESSION cookie here..."
              value={sessionCookie}
              onChange={(e) => setSessionCookie(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              csrftoken Token *
            </label>
            <input
              type="password"
              placeholder="Paste your csrftoken here..."
              value={csrfToken}
              onChange={(e) => setCsrfToken(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Expandable Help Instructions */}
          <button
            type="button"
            onClick={() => setShowHelp((prev) => !prev)}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1.5 cursor-pointer self-start"
          >
            <FiHelpCircle className="text-sm" />
            <span>{showHelp ? "Hide instructions" : "How do I find these in 15 seconds?"}</span>
          </button>

          {showHelp && (
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 space-y-1.5 animate-in fade-in duration-150">
              <p className="font-semibold text-white">Quick 3 steps:</p>
              <ol className="list-decimal list-inside space-y-1 text-slate-400 pl-1">
                <li>Log in to <strong className="text-slate-200">leetcode.com</strong> in your browser.</li>
                <li>Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-white font-mono text-[10px]">F12</kbd> (or right click &gt; Inspect) &rarr; Go to <strong className="text-slate-200">Application</strong> (or Storage) &rarr; <strong className="text-slate-200">Cookies</strong>.</li>
                <li>Copy the values for <code className="text-[#FFA116] bg-slate-900 px-1 py-0.5 rounded">LEETCODE_SESSION</code> and <code className="text-[#FFA116] bg-slate-900 px-1 py-0.5 rounded">csrftoken</code>.</li>
              </ol>
            </div>
          )}
        </form>
      )}
    </Modal>
  );
}

export default LeetCodeSessionModal;
