import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";

import WeeklyProgressChart from "../components/analytics/WeeklyProgressChart";
import DifficultyPieChart from "../components/analytics/DifficultyPieChart";
import PlatformBarChart from "../components/analytics/PlatformBarChart";

import { getAnalytics } from "../services/analyticsService";

function Analytics() {

  const [weeklyData, setWeeklyData] = useState([]);
  const [leetcodeDifficultyData, setLeetcodeDifficultyData] = useState([]);
  const [codeforcesDifficultyData, setCodeforcesDifficultyData] = useState([]);
  const [platformData, setPlatformData] = useState([]);
  const [hasLeetcode, setHasLeetcode] = useState(false);
  const [hasCodeforces, setHasCodeforces] = useState(false);

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const data = await getAnalytics();

        setWeeklyData(data.weekly || []);
        setLeetcodeDifficultyData(data.leetcodeDifficulty || []);
        setCodeforcesDifficultyData(data.codeforcesDifficulty || []);
        setPlatformData(data.platform || []);
        setHasLeetcode(data.hasLeetcode || false);
        setHasCodeforces(data.hasCodeforces || false);

      } catch (err) {

        console.error("Analytics fetch error:", err);

      }

    };

    fetchAnalytics();

  }, []);

  return (

    <DashboardLayout title="Analytics">

      <div className="grid grid-cols-2 gap-6">

        <WeeklyProgressChart data={weeklyData} />

        <PlatformBarChart data={platformData} />

        {hasLeetcode && <DifficultyPieChart title="LeetCode Difficulty" data={leetcodeDifficultyData} />}

        {hasCodeforces && <DifficultyPieChart title="Codeforces Difficulty" data={codeforcesDifficultyData} />}

      </div>

    </DashboardLayout>

  );

}

export default Analytics;