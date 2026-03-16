function ProblemFilters({ search, setSearch, difficulty, setDifficulty, platform, setPlatform }) {

  return (

    <div className="flex gap-4 mb-6">

      {/* Search */}

      <input
        type="text"
        placeholder="Search by name or number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-[#0f172a] border border-white/10 p-2 rounded-lg text-white"
      />

      {/* Difficulty */}

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="bg-[#0f172a] border border-white/10 p-2 rounded-lg text-white"
      >
        <option value="">All Difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      {/* Platform */}

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="bg-[#0f172a] border border-white/10 p-2 rounded-lg text-white"
      >
        <option value="">All Platforms</option>
        <option value="leetcode">LeetCode</option>
        <option value="codeforces">Codeforces</option>
        <option value="other">Other</option>
      </select>

    </div>

  );

}

export default ProblemFilters;