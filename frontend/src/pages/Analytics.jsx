import React, { useEffect, useState, useMemo } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import WeeklyProgressChart from "../components/analytics/WeeklyProgressChart";
import DifficultyPieChart from "../components/analytics/DifficultyPieChart";
import PlatformBarChart from "../components/analytics/PlatformBarChart";
import TopicBarChart from "../components/analytics/TopicBarChart";
import TopicCoverageTable from "../components/analytics/TopicCoverageTable";
import Loader from "../components/ui/Loader";
import SEO from "../components/ui/SEO";
import { getAnalytics } from "../services/analyticsService";

function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        const res = await getAnalytics();
        setData(res);
      } catch (err) {
        console.error("Analytics fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const topicCounts = useMemo(() => {
    const counts = {};
    if (data?.topics) {
      data.topics.forEach((t) => {
        counts[t.topic] = t.count;
      });
    }
    return counts;
  }, [data]);

  if (loading) {
    return (
      <DashboardLayout title="Analytics">
        <Loader text="Loading your DSA analytics..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Analytics">
      <SEO
        title="DSA Analytics & Topics"
        description="Comprehensive algorithmic topic distribution, weak area gap analysis, and difficulty breakdown across LeetCode and Codeforces."
      />
      <div className="flex flex-col gap-8">
        {/* Topic Gap Analysis / Readiness Grid */}
        <TopicCoverageTable topicCounts={topicCounts} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopicBarChart data={data?.topics || []} />
          <WeeklyProgressChart data={data?.weekly || []} />
          <PlatformBarChart data={data?.platform || []} />

          {data?.hasLeetcode && (
            <DifficultyPieChart
              title="LeetCode Difficulty Distribution"
              data={data.leetcodeDifficulty || []}
            />
          )}

          {data?.hasCodeforces && (
            <DifficultyPieChart
              title="Codeforces Rating Distribution"
              data={data.codeforcesDifficulty || []}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Analytics;