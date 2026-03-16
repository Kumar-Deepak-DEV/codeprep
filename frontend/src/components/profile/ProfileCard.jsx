function ProfileCard({ user }) {

  return (

    <div className="bg-[#0f172a] border border-white/10 rounded-xl p-6">

      <h2 className="text-white text-lg mb-4">Profile Information</h2>

      <div className="flex flex-col gap-3 text-gray-300">

        <div>
          <span className="text-gray-400">Username:</span> {user.username}
        </div>

        <div>
          <span className="text-gray-400">Email:</span> {user.email}
        </div>

        <div>
          <span className="text-gray-400">Daily Goal:</span> {user.dailyGoal}
        </div>

      </div>

    </div>

  );

}

export default ProfileCard;