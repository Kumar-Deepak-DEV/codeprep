import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Card from "../ui/Card";
import { FiPieChart } from "react-icons/fi";

const COLORS = ["#00FF66", "#f59e0b", "#f43f5e"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-[#050d08] border border-[#00FF66]/40 p-3 rounded-xl shadow-[0_0_15px_rgba(0,255,102,0.2)] text-xs font-mono">
        <p className="font-semibold text-white">{data.name}</p>
        <p className="mt-1" style={{ color: data.payload.fill }}>
          Solved: <strong className="text-white font-bold">{data.value}</strong>
        </p>
      </div>
    );
  }
  return null;
};

function DifficultyPieChart({ title = "Difficulty Distribution", data = [] }) {
  const total = data.reduce((acc, curr) => acc + (curr.value || 0), 0);
  const hasData = total > 0;

  return (
    <Card
      title={title}
      subtitle={hasData ? `${total} problems solved` : "No problems logged yet"}
      icon={<FiPieChart />}
    >
      <div className="h-64 w-full flex items-center justify-center">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => <span className="text-xs text-[#a7f3d0] font-mono">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-slate-500 text-sm font-mono">
            No submissions recorded for this platform.
          </div>
        )}
      </div>
    </Card>
  );
}

export default DifficultyPieChart;