function GoalHistory({ history }) {

  return (

    <div className="bg-[#0f172a] border border-white/10 rounded-xl p-6">

      <h2 className="text-white mb-4">
        Goal History
      </h2>

      <div className="flex flex-col gap-3">

        {history.map((item, index) => (

          <div
            key={index}
            className="flex justify-between bg-[#020617] border border-white/5 rounded-lg p-3"
          >

            <span className="text-gray-300">
              {item.date}
            </span>

            <span className="text-blue-400">
              {item.solved}/{item.goal}
            </span>

          </div>

        ))}

      </div>

    </div>

  );

}

export default GoalHistory;