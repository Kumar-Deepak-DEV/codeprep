import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import RevisionColumn from "../components/revision/RevisionColumn";
import { getRevisionProblems } from "../services/revisionService";

function Revision() {

  const [overdue, setOverdue] = useState([]);
  const [today, setToday] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {

    const fetchRevision = async () => {

      try {

        const data = await getRevisionProblems();

        setOverdue(data.overdue || []);
        setToday(data.today || []);
        setUpcoming(data.upcoming || []);

      } catch (err) {

        console.error("Revision fetch error:", err);

      }

    };

    fetchRevision();

  }, []);

  return (

    <DashboardLayout title="Revision">

      <div className="grid grid-cols-3 gap-6">

        <RevisionColumn
          title="Overdue"
          problems={overdue}
        />

        <RevisionColumn
          title="Due Today"
          problems={today}
        />

        <RevisionColumn
          title="Upcoming"
          problems={upcoming}
        />

      </div>

    </DashboardLayout>

  );

}

export default Revision;