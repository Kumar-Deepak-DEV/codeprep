import { useState } from "react";
import { updatePlatforms } from "../../services/profileService";

function ManualIntegration({ onUpdate }) {

  const [handle, setHandle] = useState("");
  const [platform, setPlatform] = useState("leetcode");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handle) return;
    
    setLoading(true);
    try {
      const payload = { platforms: {} };
      payload.platforms[platform] = handle;
      
      const updatedUser = await updatePlatforms(payload);
      
      setHandle("");
      if (onUpdate) onUpdate(updatedUser);
    } catch (err) {
      console.error("Failed to update platform:", err);
      alert("Failed to connect platform");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f172a] border border-white/10 rounded-xl p-6">
      <h2 className="text-white text-lg mb-4">
        Connect Platform
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-3 flex-wrap">
        <select 
          value={platform} 
          onChange={(e) => setPlatform(e.target.value)}
          className="bg-[#020617] border border-white/10 p-2 rounded-lg text-white outline-none"
        >
          <option value="leetcode">LeetCode</option>
          <option value="codeforces">Codeforces</option>
        </select>

        <input
          type="text"
          placeholder="Enter handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          className="bg-[#020617] border border-white/10 p-2 rounded-lg text-white flex-1 min-w-[150px] outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 px-4 py-2 rounded-lg text-white disabled:opacity-50"
        >
          {loading ? "Connecting..." : "Connect"}
        </button>
      </form>
    </div>
  );
}

export default ManualIntegration;