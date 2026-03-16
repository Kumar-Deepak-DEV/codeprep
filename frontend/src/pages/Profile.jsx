import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";

import ProfileCard from "../components/profile/ProfileCard";
import PlatformCard from "../components/profile/PlatformCard";
import ManualIntegration from "../components/profile/ManualIntegration";
import { getProfile } from "../services/profileService";

function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <DashboardLayout title="Profile">
        <div className="text-white">Loading profile...</div>
      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout title="Profile">

      <div className="grid grid-cols-2 gap-6">

        <ProfileCard user={user} />

        <ManualIntegration onUpdate={setUser} />

        <PlatformCard
          platform="LeetCode"
          handle={user.platforms?.leetcode || ""}
        />

        <PlatformCard
          platform="Codeforces"
          handle={user.platforms?.codeforces || ""}
        />

      </div>

    </DashboardLayout>

  );

}

export default Profile;