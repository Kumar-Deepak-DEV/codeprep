import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import RevisionColumn from "../components/revision/RevisionColumn";
import Loader from "../components/ui/Loader";
import SEO from "../components/ui/SEO";
import { getRevisionProblems } from "../services/revisionService";
import { FiInfo } from "react-icons/fi";

function Revision() {
  const [overdue, setOverdue] = useState([]);
  const [today, setToday] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevisionData = async () => {
      try {
        setLoading(true);
        const data = await getRevisionProblems();
        setOverdue(data?.overdue || []);
        setToday(data?.today || []);
        setUpcoming(data?.upcoming || []);
      } catch (err) {
        console.error("Revision fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRevisionData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout title="Revision System">
        <SEO title="Spaced Repetition & Revision" />
        <Loader text="Loading your revision queues..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Spaced Repetition & Revision">
      <SEO
        title="Spaced Repetition & Revision"
        description="Strengthen algorithmic recall with an automated spaced repetition system for technical coding interviews."
      />
      {/* Information Header */}
      <div className="p-4 rounded-2xl bg-[#09150e] border border-[#00FF66]/25 mb-6 flex items-start gap-3 text-xs text-[#a7f3d0]">
        <FiInfo className="text-[#00FF66] text-base mt-0.5 shrink-0" />
        <div className="leading-relaxed">
          <strong className="text-[#00FF66] font-mono">SPACED REPETITION ENGINE:</strong> Solved problems automatically enter a 7-day recall cycle. Reviewing past problems reinforces algorithmic patterns in long-term memory so you never blank on solutions during technical interviews.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RevisionColumn
          title="Overdue"
          problems={overdue}
          type="overdue"
        />

        <RevisionColumn
          title="Due Today"
          problems={today}
          type="today"
        />

        <RevisionColumn
          title="Upcoming (Next 7 Days)"
          problems={upcoming}
          type="upcoming"
        />
      </div>
    </DashboardLayout>
  );
}

export default Revision;