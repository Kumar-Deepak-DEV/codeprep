import React, { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

function AddProblemModal({ isOpen, onClose, onProblemAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "",
    link: "",
    solvedDate: new Date().toISOString().split("T")[0]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Problem title is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await onProblemAdded({
        ...formData,
        problemNumber: formData.title.toLowerCase().replace(/[^a-z0-9]/g, "-")
      });
      onClose();
      setFormData({
        title: "",
        platform: "leetcode",
        difficulty: "Medium",
        topic: "",
        link: "",
        solvedDate: new Date().toISOString().split("T")[0]
      });
    } catch (err) {
      setError(err.message || "Failed to add problem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log Solved Problem"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            Save Record
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-[#a7f3d0] mb-1 font-mono">
            Problem Title *
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="e.g. Trapping Rain Water"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-[#050d08] border border-[#00FF66]/25 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#00FF66] focus:shadow-[0_0_10px_rgba(0,255,102,0.2)] outline-none font-mono"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#a7f3d0] mb-1 font-mono">
              Platform
            </label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full bg-[#050d08] border border-[#00FF66]/25 rounded-xl px-3 py-2.5 text-sm text-white focus:border-[#00FF66] outline-none cursor-pointer font-mono"
            >
              <option value="leetcode">LeetCode</option>
              <option value="codeforces">Codeforces</option>
              <option value="hackerrank">HackerRank</option>
              <option value="codechef">CodeChef</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a7f3d0] mb-1 font-mono">
              Difficulty
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full bg-[#050d08] border border-[#00FF66]/25 rounded-xl px-3 py-2.5 text-sm text-white focus:border-[#00FF66] outline-none cursor-pointer font-mono"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#a7f3d0] mb-1 font-mono">
            Topics / Tags (comma-separated)
          </label>
          <input
            type="text"
            name="topic"
            placeholder="e.g. Array, Two Pointers, Dynamic Programming"
            value={formData.topic}
            onChange={handleChange}
            className="w-full bg-[#050d08] border border-[#00FF66]/25 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#00FF66] outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#a7f3d0] mb-1 font-mono">
            Problem Link (URL)
          </label>
          <input
            type="url"
            name="link"
            placeholder="https://..."
            value={formData.link}
            onChange={handleChange}
            className="w-full bg-[#050d08] border border-[#00FF66]/25 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#00FF66] outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#a7f3d0] mb-1 font-mono">
            Solved Date
          </label>
          <input
            type="date"
            name="solvedDate"
            value={formData.solvedDate}
            onChange={handleChange}
            className="w-full bg-[#050d08] border border-[#00FF66]/25 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#00FF66] outline-none font-mono"
          />
        </div>
      </form>
    </Modal>
  );
}

export default AddProblemModal;
