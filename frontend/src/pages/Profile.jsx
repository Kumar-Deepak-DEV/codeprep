import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProfileCard from "../components/profile/ProfileCard";
import PlatformCard from "../components/profile/PlatformCard";
import ManualIntegration from "../components/profile/ManualIntegration";
import SessionConnect from "../components/profile/SessionConnect";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import SEO from "../components/ui/SEO";
import { getProfile, triggerSync } from "../services/profileService";
import { FiRefreshCw, FiCheckCircle } from "react-icons/fi";

function Profile() {
  const [user, setUser] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setUser(data);
    } catch (err) {
      console.error("Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSyncNow = async () => {
    setSyncing(true);
    setSyncSuccess(false);
    try {
      await triggerSync();
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 5000);
      fetchProfile();
    } catch (err) {
      console.error("Manual sync failed:", err);
      alert("Sync failed to trigger. Please check your network and connected handles.");
    } finally {
      setSyncing(false);
    }
  };

  if (loading || !user) {
    return (
      <DashboardLayout title="Profile & Integrations">
        <SEO title="Profile & Integrations" />
        <Loader text="Loading your profile configurations..." />
      </DashboardLayout>
    );
  }

  const sessionConnected = Boolean(user.leetcodeSession?.connectedAt);

  return (
    <DashboardLayout title="Profile & Platform Integrations">
      <SEO
        title="Profile & Platform Integrations"
        description="Manage your connected LeetCode and Codeforces coding profiles, session tokens, and background synchronization."
      />
      <div className="flex flex-col gap-6">
        {/* Sync Action Header Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#041209] via-[#060c08] to-[#020504] border border-[#00FF66]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_20px_rgba(0,255,102,0.1)]">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-[#00FF66] font-mono">&gt;</span>
              <span>Synchronize Problem Solve Records</span>
            </h3>
            <p className="text-xs text-[#a7f3d0]/80 mt-0.5 font-mono">
              CodePrep queries LeetCode & Codeforces to pull new solves. Click below for an immediate sync.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {syncSuccess && (
              <span className="text-xs text-[#00FF66] font-semibold flex items-center gap-1.5 animate-in fade-in font-mono">
                <FiCheckCircle />
                <span>Sync initiated!</span>
              </span>
            )}
            <Button
              variant="primary"
              onClick={handleSyncNow}
              loading={syncing}
              icon={<FiRefreshCw className={syncing ? "animate-spin" : ""} />}
            >
              {syncing ? "Synchronizing..." : "Sync Now"}
            </Button>
          </div>
        </div>

        {/* Profile Details & Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfileCard user={user} />
          <ManualIntegration onUpdate={setUser} />

          <PlatformCard
            platform="LeetCode"
            handle={user.platforms?.leetcode || ""}
            lastSync={user.lastSync?.leetcode}
          />

          <PlatformCard
            platform="Codeforces"
            handle={user.platforms?.codeforces || ""}
            lastSync={user.lastSync?.codeforces}
          />

          <SessionConnect connected={sessionConnected} onUpdate={fetchProfile} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
