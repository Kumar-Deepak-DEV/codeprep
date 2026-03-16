function GoalProgressCircle({ solved, goal }) {

  const percentage = Math.min((solved / goal) * 100, 100);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (percentage / 100) * circumference;

  return (

    <div className="bg-[#0f172a] border border-white/10 rounded-xl p-6 flex flex-col items-center">

      <h2 className="text-white mb-4">Today's Goal</h2>

      <svg width="140" height="140">

        {/* background circle */}

        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#1e293b"
          strokeWidth="10"
          fill="transparent"
        />

        {/* progress circle */}

        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#3b82f6"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
        />

        {/* text */}

        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="18"
          fontWeight="bold"
        >
          {solved}/{goal}
        </text>

      </svg>

      <p className="text-gray-400 text-sm mt-3">
        {Math.round(percentage)}% Completed
      </p>

    </div>

  );

}

export default GoalProgressCircle;