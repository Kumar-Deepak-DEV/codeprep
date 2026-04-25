import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import Card from "../ui/Card";
import { FiTrendingUp } from "react-icons/fi";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#050d08] border border-[#00FF66]/40 p-3 rounded-xl shadow-[0_0_15px_rgba(0,255,102,0.2)] text-xs font-mono">
        <p className="font-semibold text-white">{label}</p>
        <p className="text-[#00FF66] mt-1 font-medium">
          Solved: <strong className="text-white font-bold">{payload[0].value}</strong> problems
        </p>
      </div>
    );
  }
  return null;
};

function PerformanceChart({ data = [] }) {
  const totalWeekly = data.reduce((acc, curr) => acc + (curr.solved || 0), 0);

  return (
    <Card
      title="Weekly Performance"
      subtitle="Your 7-day problem-solving momentum"
      icon={<FiTrendingUp />}
      action={
        <div className="text-xs text-[#a7f3d0] bg-[#09150e] px-3 py-1 rounded-xl border border-[#00FF66]/30 font-mono">
          This week: <strong className="text-[#00FF66] font-bold">{totalWeekly}</strong> solved
        </div>
      }
    >
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="matrixGreenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00FF66" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00FF66" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#0f2419" />
            <XAxis
              dataKey="day"
              stroke="#00FF66"
              tick={{ fill: "#6ee7b7", fontSize: 12, fontFamily: "JetBrains Mono" }}
              tickLine={false}
            />
            <YAxis
              stroke="#00FF66"
              allowDecimals={false}
              tick={{ fill: "#6ee7b7", fontSize: 12, fontFamily: "JetBrains Mono" }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="solved"
              stroke="#00FF66"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#matrixGreenGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default PerformanceChart;
