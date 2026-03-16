function RevisionCard({ problem }) {

  return (

    <div className="bg-[#020617] border border-white/10 rounded-lg p-3">

      <p className="text-white text-sm">
        {problem.title}
      </p>

      <p className="text-gray-400 text-xs mt-1">
        {problem.platform}
      </p>

    </div>

  );

}

export default RevisionCard;