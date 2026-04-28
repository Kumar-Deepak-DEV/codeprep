import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import GoalProgressCircle from "../components/goals/GoalProgressCircle";
import GoalHistory from "../components/goals/GoalHistory";
import StatCard from "../components/ui/StatCard";
import Loader from "../components/ui/Loader";
import SEO from "../components/ui/SEO";
import { getGoals } from "../services/goalsService";
import { getDashboardStats } from "../services/dashboardService";
import { FiZap, FiTarget, FiAward } from "react-icons/fi";

function Goals() {
  const [today, setToday] = useState({ solved: 0, goal: 3 });
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoalsData = async () => {
      try {
        setLoading(true);
        const [goalsData, statsData] = await Promise.all([
          getGoals().catch(() => null),
          getDashboardStats().catch(() => null)
        ]);

        if (goalsData) {
          setToday(goalsData.today || { solved: 0, goal: 3 });
          setHistory(goalsData.history || []);
        }
        setStats(statsData);
      } catch (err) {
        console.error("Goals fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoalsData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout title="Daily Goals & Consistency">
        <SEO title="Daily Goals & Consistency" />
        <Loader text="Loading your goal consistency metrics..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Daily Goals & Consistency Tracker">
      <SEO
        title="Daily Goals & Consistency"
        description="Track your daily problem solving targets, active practice streaks, and weekly consistency momentum."
      />
      <div className="flex flex-col gap-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard
            title="Current Practice Streak"
            value={`${stats?.streak || 0} Days`}
            icon={<FiZap />}
            accent="amber"
            subtitle="Consecutive daily solve streak"
          />
          <StatCard
            title="Today's Target"
            value={`${today.solved} / ${today.goal}`}
            icon={<FiTarget />}
            accent="matrix"
            subtitle={
              today.solved >= today.goal
                ? "Daily goal reached! 🎯"
                : `${Math.max(0, today.goal - today.solved)} problems to target`
            }
          />
          <StatCard
            title="Weekly Total"
            value={`${history.reduce((a, b) => a + (b.solved || 0), 0) + today.solved} Solved`}
            icon={<FiAward />}
            accent="emerald"
            subtitle="Combined past 6 days activity"
          />
        </div>

        {/* Progress Circle & History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GoalProgressCircle
            solved={today.solved}
            goal={today.goal}
          />

          <GoalHistory history={history} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Goals;