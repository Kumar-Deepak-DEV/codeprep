import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import PerformanceChart from "../components/dashboard/PerformanceChart";
import { getDashboardStats } from "../services/dashboardService";
import RecentActivity from "../components/dashboard/RecentActivity";

import { getAnalytics } from "../services/analyticsService";

function Dashboard() {

  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {

    const fetchDashboardAndAnalytics = async () => {

      try {

        const [dashboardData, analyticsData] = await Promise.all([
          getDashboardStats(),
          getAnalytics()
        ]);

        setStats(dashboardData);
        setChartData(analyticsData.weekly || []);

      } catch (err) {

        console.error("Dashboard fetch error:", err);

      }

    };

    fetchDashboardAndAnalytics();

  }, []);

  return (

    <DashboardLayout title="Dashboard">

      {/* Stat Cards */}

      {stats && (

        <>

          <div className="grid grid-cols-4 gap-6">

            <StatCard title="Total Problems" value={stats.totalSolved} />
            <StatCard title="Current Streak" value={stats.streak} />
            <StatCard title="Today Solved" value={stats.todaySolved} />
            <StatCard title="Daily Goal" value={stats.dailyGoal} />

          </div>

          {stats.leetcodeStats && stats.leetcodeStats.totalSolved > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">LeetCode Stats</h3>
              <div className="grid grid-cols-4 gap-6">
                <StatCard title="Total Solved" value={stats.leetcodeStats.totalSolved} />
                <StatCard title="Easy" value={stats.leetcodeStats.easySolved} />
                <StatCard title="Medium" value={stats.leetcodeStats.mediumSolved} />
                <StatCard title="Hard" value={stats.leetcodeStats.hardSolved} />
              </div>
            </div>
          )}

          {stats.codeforcesStats && stats.codeforcesStats.totalSolved > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">Codeforces Stats</h3>
              <div className="grid grid-cols-4 gap-6">
                <StatCard title="Total Solved" value={stats.codeforcesStats.totalSolved} />
                <StatCard title="Easy (≤ 1200)" value={stats.codeforcesStats.easySolved} />
                <StatCard title="Medium (1300-1800)" value={stats.codeforcesStats.mediumSolved} />
                <StatCard title="Hard (> 1800)" value={stats.codeforcesStats.hardSolved} />
                <div className="col-span-4 mt-2">
                  <StatCard title="Current Rating" value={stats.codeforcesStats.rating || 'Unrated'} />
                </div>
              </div>
            </div>
          )}

        </>

      )}

      {/* Chart + Activity */}

      <div className="mt-8 grid grid-cols-2 gap-6">

        <PerformanceChart data={chartData} />

        <RecentActivity problems={stats?.recentProblems || []} />

      </div>

    </DashboardLayout>

  );

}

export default Dashboard;