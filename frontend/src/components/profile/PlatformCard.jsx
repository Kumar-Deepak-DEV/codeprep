function PlatformCard({ platform, handle }) {

  return (

    <div className="bg-[#0f172a] border border-white/10 rounded-xl p-6">

      <h2 className="text-white text-lg mb-3">
        {platform}
      </h2>

      <p className="text-gray-400 text-sm">
        Connected handle
      </p>

      <p className="text-blue-400 mt-2">
        {handle || "Not Connected"}
      </p>

    </div>

  );

}

export default PlatformCard;