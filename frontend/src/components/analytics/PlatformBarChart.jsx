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
import { FiLayers } from "react-icons/fi";

const PLATFORM_COLORS = {
  leetcode: "#FFA116",
  codeforces: "#1890ff"
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#050d08] border border-[#00FF66]/40 p-3 rounded-xl shadow-[0_0_15px_rgba(0,255,102,0.2)] text-xs font-mono">
        <p className="font-semibold text-white uppercase">{data.platform}</p>
        <p className="text-[#00FF66] mt-1">
          Solved: <strong className="text-white font-bold">{data.solved}</strong> problems
        </p>
      </div>
    );
  }
  return null;
};

function PlatformBarChart({ data = [] }) {
  const hasData = data && data.length > 0 && data.some((d) => d.solved > 0);

  return (
    <Card
      title="Platform Comparison"
      subtitle="Solved problem breakdown by platform"
      icon={<FiLayers />}
    >
      <div className="h-64 w-full">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f2419" />
              <XAxis
                dataKey="platform"
                stroke="#00FF66"
                tick={{ fill: "#6ee7b7", fontSize: 12, fontFamily: "JetBrains Mono" }}
                tickFormatter={(val) => val.toUpperCase()}
              />
              <YAxis
                stroke="#00FF66"
                tick={{ fill: "#6ee7b7", fontSize: 12, fontFamily: "JetBrains Mono" }}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="solved" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PLATFORM_COLORS[entry.platform?.toLowerCase()] || "#00FF66"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm font-mono">
            No platform data available.
          </div>
        )}
      </div>
    </Card>
  );
}

export default PlatformBarChart;