import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import GoalProgressCircle from "../components/goals/GoalProgressCircle";
import GoalHistory from "../components/goals/GoalHistory";
import { getGoals } from "../services/goalsService";

function Goals() {

  const [today, setToday] = useState({ solved: 0, goal: 0 });
  const [history, setHistory] = useState([]);

  useEffect(() => {

    const fetchGoals = async () => {

      try {

        const data = await getGoals();

        setToday(data.today || { solved: 0, goal: 0 });
        setHistory(data.history || []);

      } catch (err) {

        console.error("Goals fetch error:", err);

      }

    };

    fetchGoals();

  }, []);

  return (

    <DashboardLayout title="Goals">

      <div className="grid grid-cols-2 gap-6">

        <GoalProgressCircle
          solved={today.solved}
          goal={today.goal}
        />

        <GoalHistory history={history} />

      </div>

    </DashboardLayout>

  );

}

export default Goals;