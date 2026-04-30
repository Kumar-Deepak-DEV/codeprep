import React, { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { updatePlatforms } from "../../services/profileService";
import { FiLink, FiCheck } from "react-icons/fi";

function ManualIntegration({ onUpdate }) {
  const [handle, setHandle] = useState("");
  const [platform, setPlatform] = useState("leetcode");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handle.trim()) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const payload = { platforms: {} };
      payload.platforms[platform] = handle.trim();

      const updatedUser = await updatePlatforms(payload);

      setHandle("");
      setSuccessMsg(`Successfully connected ${platform === "leetcode" ? "LeetCode" : "Codeforces"} handle!`);
      if (onUpdate) onUpdate(updatedUser);
    } catch (err) {
      console.error("Failed to update platform:", err);
      setErrorMsg("Failed to connect handle. Please verify the handle and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Link or Update Handle"
      subtitle="Connect public competitive programming profiles"
      icon={<FiLink />}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {successMsg && (
          <div className="p-3 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs flex items-center gap-2 font-mono">
            <FiCheck className="text-sm shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#a7f3d0] mb-1.5 font-mono">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-[#050d08] border border-[#00FF66]/25 rounded-xl px-3 py-2.5 text-sm text-white focus:border-[#00FF66] outline-none cursor-pointer font-mono"
            >
              <option value="leetcode">LeetCode</option>
              <option value="codeforces">Codeforces</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#a7f3d0] mb-1.5 font-mono">
              Profile Username / Handle
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={platform === "leetcode" ? "e.g. tour_de_code" : "e.g. tourist"}
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                required
                className="flex-1 bg-[#050d08] border border-[#00FF66]/25 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#00FF66] outline-none font-mono"
              />
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={!handle.trim()}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
}

export default ManualIntegration;