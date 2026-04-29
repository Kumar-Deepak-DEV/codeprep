import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";
import Card from "../ui/Card";
import { FiBarChart2 } from "react-icons/fi";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#050d08] border border-[#00FF66]/40 p-3 rounded-xl shadow-[0_0_15px_rgba(0,255,102,0.2)] text-xs font-mono">
        <p className="font-semibold text-white">{data.topic}</p>
        <p className="text-[#00FF66] mt-1">
          Solved: <strong className="text-white font-bold">{data.count}</strong> problems
        </p>
      </div>
    );
  }
  return null;
};

const MATRIX_BAR_COLORS = [
  "#00FF66", "#00df59", "#10b981", "#059669",
  "#34d399", "#6ee7b7", "#00F5D4", "#70e000"
];

function TopicBarChart({ data = [] }) {
  const sortedData = [...data]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const hasData = sortedData.length > 0;

  return (
    <Card
      title="DSA Topic Distribution"
      subtitle="Top practiced algorithmic concepts"
      icon={<FiBarChart2 />}
      action={
        hasData && (
          <span className="text-xs text-[#a7f3d0] bg-[#09150e] px-3 py-1 rounded-xl border border-[#00FF66]/30 font-mono">
            {data.length} topics tagged
          </span>
        )
      }
    >
      <div className="h-72 w-full">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f2419" horizontal={false} />
              <XAxis
                type="number"
                stroke="#00FF66"
                tick={{ fill: "#6ee7b7", fontSize: 11, fontFamily: "JetBrains Mono" }}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="topic"
                stroke="#00FF66"
                tick={{ fill: "#6ee7b7", fontSize: 11, fontFamily: "JetBrains Mono" }}
                width={105}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {sortedData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={MATRIX_BAR_COLORS[index % MATRIX_BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm font-mono">
            No topic data available yet.
          </div>
        )}
      </div>
    </Card>
  );
}

export default TopicBarChart;