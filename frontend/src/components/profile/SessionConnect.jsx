import React, { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { connectLeetCodeSession, disconnectLeetCodeSession } from "../../services/profileService";
import { FiLock, FiCheckCircle, FiHelpCircle, FiKey, FiShield } from "react-icons/fi";

function SessionConnect({ connected, onUpdate }) {
  const [sessionCookie, setSessionCookie] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleConnect = async (e) => {
    e.preventDefault();
    if (!sessionCookie || !csrfToken) return;

    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      await connectLeetCodeSession({ sessionCookie, csrfToken });
      setSessionCookie("");
      setCsrfToken("");
      setMsg({ type: "success", text: "Connected securely! Complete history synchronization started." });
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error("Failed to connect LeetCode session:", err);
      setMsg({ type: "error", text: "Connection failed. Please check cookie and token values." });
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setLoading(true);
    setMsg({ type: "", text: "" });
    try {
      await disconnectLeetCodeSession();
      setMsg({ type: "success", text: "LeetCode session disconnected." });
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error("Failed to disconnect:", err);
      setMsg({ type: "error", text: "Failed to disconnect session." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="LeetCode Full History Sync"
      subtitle="Connect session cookies for complete historical solve tracking"
      icon={<FiLock />}
      className="col-span-1 lg:col-span-2"
      action={
        connected ? (
          <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#00FF66]/15 text-[#00FF66] border border-[#00FF66]/40 shadow-[0_0_6px_rgba(0,255,102,0.2)] flex items-center gap-1">
            <FiCheckCircle />
            <span>Active Session</span>
          </span>
        ) : null
      }
    >
      <div className="flex flex-col gap-4">
        {msg.text && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 font-mono ${
              msg.type === "success"
                ? "bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66]"
                : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
            }`}
          >
            <span>{msg.text}</span>
          </div>
        )}

        <div className="p-4 rounded-2xl bg-[#040906] border border-[#00FF66]/20 text-xs text-[#a7f3d0] flex items-start gap-3">
          <FiShield className="text-[#00FF66] text-base mt-0.5 shrink-0" />
          <div className="leading-relaxed">
            <strong className="text-[#00FF66] font-mono">Why is this needed?</strong> LeetCode's public GraphQL API only returns the latest 15 submissions. Adding your session tokens allows CodePrep to pull your entire historical problem catalog. Tokens are stored encrypted with AES-256-GCM.
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowHelp((s) => !s)}
          className="text-[#00FF66] hover:text-[#6ee7b7] text-xs font-mono font-semibold inline-flex items-center gap-1.5 cursor-pointer self-start"
        >
          <FiHelpCircle className="text-sm" />
          <span>{showHelp ? "Hide instructions" : "How do I find my session cookie & token?"}</span>
        </button>

        {showHelp && (
          <div className="p-4 rounded-2xl bg-[#050d08] border border-[#00FF66]/30 text-xs text-[#a7f3d0] space-y-2 font-mono">
            <p className="font-bold text-white">Follow these 3 quick steps:</p>
            <ol className="list-decimal list-inside space-y-1 text-slate-300 pl-1">
              <li>Log into <strong className="text-[#00FF66]">leetcode.com</strong> in your browser.</li>
              <li>Open DevTools (<kbd className="bg-black border border-[#00FF66]/40 px-1 py-0.5 rounded text-[#00FF66]">F12</kbd> or <kbd className="bg-black border border-[#00FF66]/40 px-1 py-0.5 rounded text-[#00FF66]">Inspect</kbd>) → Go to <strong className="text-white">Application</strong> → <strong className="text-white">Cookies</strong>.</li>
              <li>Copy the values for <code className="text-[#00FF66] bg-black px-1.5 py-0.5 rounded">LEETCODE_SESSION</code> and <code className="text-[#00FF66] bg-black px-1.5 py-0.5 rounded">csrftoken</code>.</li>
            </ol>
          </div>
        )}

        {connected ? (
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400 font-mono">
              Your LeetCode session is connected and syncing in the background.
            </span>
            <Button
              variant="danger"
              size="sm"
              loading={loading}
              onClick={handleDisconnect}
            >
              Disconnect Session
            </Button>
          </div>
        ) : (
          <form onSubmit={handleConnect} className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-[#a7f3d0] mb-1.5 font-mono">
                LEETCODE_SESSION Cookie *
              </label>
              <input
                type="password"
                placeholder="eyJhbGciOi..."
                value={sessionCookie}
                onChange={(e) => setSessionCookie(e.target.value)}
                required
                className="w-full bg-[#050d08] border border-[#00FF66]/25 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#00FF66] outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a7f3d0] mb-1.5 font-mono">
                csrftoken Token *
              </label>
              <input
                type="password"
                placeholder="abc123xyz..."
                value={csrfToken}
                onChange={(e) => setCsrfToken(e.target.value)}
                required
                className="w-full bg-[#050d08] border border-[#00FF66]/25 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#00FF66] outline-none font-mono"
              />
            </div>

            <div className="md:col-span-2 flex justify-end mt-1">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={!sessionCookie || !csrfToken}
                icon={<FiKey />}
              >
                Connect & Import Full History
              </Button>
            </div>
          </form>
        )}
      </div>
    </Card>
  );
}

export default SessionConnect;
