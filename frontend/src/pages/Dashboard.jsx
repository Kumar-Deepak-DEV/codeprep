import React, { useEffect, useState, useMemo } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import PerformanceChart from "../components/dashboard/PerformanceChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import RecommendationsSection from "../components/recommendations/RecommendationsSection";
import WeakTopicBanner from "../components/recommendations/WeakTopicBanner";
import Loader from "../components/ui/Loader";
import SEO from "../components/ui/SEO";
import LeetCodeSessionModal from "../components/profile/LeetCodeSessionModal";
import { getDashboardStats } from "../services/dashboardService";
import { getAnalytics } from "../services/analyticsService";
import { getProblems } from "../services/problemService";
import { getProfile } from "../services/profileService";
import { getWeakTopics } from "../services/recommendationService";
import { FiCode, FiZap, FiCheckCircle, FiTarget } from "react-icons/fi";
import { SiLeetcode, SiCodeforces } from "react-icons/si";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [problems, setProblems] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [dashboardData, analyticsData, problemsData, profileData] = await Promise.all([
        getDashboardStats().catch(() => null),
        getAnalytics().catch(() => null),
        getProblems().catch(() => []),
        getProfile().catch(() => null)
      ]);

      setStats(dashboardData);
      setAnalytics(analyticsData);
      setProblems(problemsData || []);
      setUserProfile(profileData);

      // Check if user has LeetCode connected but has not connected their session cookie yet
      if (
        profileData?.platforms?.leetcode &&
        !profileData.leetcodeSession?.connectedAt &&
        !sessionStorage.getItem("codeprep_session_prompt_dismissed")
      ) {
        setShowSessionModal(true);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleCloseSessionModal = () => {
    setShowSessionModal(false);
    sessionStorage.setItem("codeprep_session_prompt_dismissed", "true");
  };

  const topicCounts = useMemo(() => {
    const counts = {};
    if (analytics?.topics) {
      analytics.topics.forEach((t) => {
        counts[t.topic] = t.count;
      });
    }
    return counts;
  }, [analytics]);

  const weakTopics = useMemo(() => {
    return getWeakTopics(topicCounts);
  }, [topicCounts]);

  if (loading) {
    return (
      <DashboardLayout title="Dashboard">
        <Loader text="Initializing Matrix DSA feed..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard">
      <SEO
        title="Dashboard"
        description="Unified DSA progress dashboard with active problem recommendations, platform breakdowns, and daily consistency streaks."
      />
      <div className="flex flex-col gap-8">
        {/* Top Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Solved"
            value={stats?.totalSolved || 0}
            icon={<FiCode />}
            accent="matrix"
            subtitle="Across connected platforms"
          />
          <StatCard
            title="Current Streak"
            value={`${stats?.streak || 0} Days`}
            icon={<FiZap />}
            accent="amber"
            subtitle="Consecutive daily solve streak"
          />
          <StatCard
            title="Today Solved"
            value={stats?.todaySolved || 0}
            icon={<FiCheckCircle />}
            accent="emerald"
            subtitle={`Target: ${stats?.dailyGoal || 3} problems/day`}
          />
          <StatCard
            title="Daily Target"
            value={stats?.dailyGoal || 3}
            icon={<FiTarget />}
            accent="matrix"
            subtitle={
              (stats?.todaySolved || 0) >= (stats?.dailyGoal || 3)
                ? "Target achieved today! 🎯"
                : `${Math.max(0, (stats?.dailyGoal || 3) - (stats?.todaySolved || 0))} remaining today`
            }
          />
        </div>

        {/* Platform Breakdown Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* LeetCode Card */}
          {stats?.leetcodeStats && stats.leetcodeStats.totalSolved > 0 ? (
            <div className="bg-[#060c08]/90 border border-[#00FF66]/20 rounded-2xl p-5 backdrop-blur shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <SiLeetcode className="text-[#FFA116] text-xl" />
                  <h3 className="text-base font-bold text-white tracking-tight">LeetCode Breakdown</h3>
                </div>
                <span className="text-xs text-[#a7f3d0] font-mono">
                  Total: <strong className="text-[#FFA116]">{stats.leetcodeStats.totalSolved}</strong>
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#040906] p-3 rounded-xl border border-[#00FF66]/20 text-center">
                  <span className="text-xs text-[#00FF66] font-semibold font-mono block">Easy</span>
                  <span className="text-xl font-extrabold text-white mt-1 block font-mono">
                    {stats.leetcodeStats.easySolved}
                  </span>
                </div>
                <div className="bg-[#040906] p-3 rounded-xl border border-amber-500/20 text-center">
                  <span className="text-xs text-amber-400 font-semibold font-mono block">Medium</span>
                  <span className="text-xl font-extrabold text-white mt-1 block font-mono">
                    {stats.leetcodeStats.mediumSolved}
                  </span>
                </div>
                <div className="bg-[#040906] p-3 rounded-xl border border-rose-500/20 text-center">
                  <span className="text-xs text-rose-400 font-semibold font-mono block">Hard</span>
                  <span className="text-xl font-extrabold text-white mt-1 block font-mono">
                    {stats.leetcodeStats.hardSolved}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#060c08]/60 border border-[#00FF66]/15 rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SiLeetcode className="text-[#FFA116] text-2xl" />
                <div>
                  <h4 className="text-sm font-semibold text-white">LeetCode Profile</h4>
                  <p className="text-xs text-slate-400">Connect in profile for live submission tracking</p>
                </div>
              </div>
            </div>
          )}

          {/* Codeforces Card */}
          {stats?.codeforcesStats && stats.codeforcesStats.totalSolved > 0 ? (
            <div className="bg-[#060c08]/90 border border-[#00FF66]/20 rounded-2xl p-5 backdrop-blur shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <SiCodeforces className="text-[#1890ff] text-xl" />
                  <h3 className="text-base font-bold text-white tracking-tight">Codeforces Breakdown</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#a7f3d0] font-mono">
                    Rating: <strong className="text-[#1890ff]">{stats.codeforcesStats.rating || "Unrated"}</strong>
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#040906] p-3 rounded-xl border border-[#00FF66]/20 text-center">
                  <span className="text-xs text-[#00FF66] font-semibold font-mono block">&le; 1200</span>
                  <span className="text-xl font-extrabold text-white mt-1 block font-mono">
                    {stats.codeforcesStats.easySolved}
                  </span>
                </div>
                <div className="bg-[#040906] p-3 rounded-xl border border-amber-500/20 text-center">
                  <span className="text-xs text-amber-400 font-semibold font-mono block">1201-1800</span>
                  <span className="text-xl font-extrabold text-white mt-1 block font-mono">
                    {stats.codeforcesStats.mediumSolved}
                  </span>
                </div>
                <div className="bg-[#040906] p-3 rounded-xl border border-rose-500/20 text-center">
                  <span className="text-xs text-rose-400 font-semibold font-mono block">&gt; 1800</span>
                  <span className="text-xl font-extrabold text-white mt-1 block font-mono">
                    {stats.codeforcesStats.hardSolved}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#060c08]/60 border border-[#00FF66]/15 rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SiCodeforces className="text-[#1890ff] text-2xl" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Codeforces Profile</h4>
                  <p className="text-xs text-slate-400">Connect your handle to sync rated contest problems</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Weak Topic Alert */}
        {weakTopics.length > 0 && <WeakTopicBanner weakTopics={weakTopics} />}

        {/* Active Targeted Practice Recommendations */}
        <RecommendationsSection
          solvedProblems={problems}
          topicCounts={topicCounts}
          limit={4}
        />

        {/* Chart + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart data={analytics?.weekly || []} />
          <RecentActivity problems={stats?.recentProblems || []} />
        </div>
      </div>

      <LeetCodeSessionModal
        isOpen={showSessionModal}
        onClose={handleCloseSessionModal}
        username={userProfile?.platforms?.leetcode}
        onConnected={fetchAllData}
      />
    </DashboardLayout>
  );
}

export default Dashboard;