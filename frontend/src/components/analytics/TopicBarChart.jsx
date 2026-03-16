import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function TopicBarChart({ data }) {

  return (

    <div className="bg-[#0f172a] border border-white/10 rounded-xl p-6">

      <h2 className="text-white mb-4">
        Topic Distribution
      </h2>

      <div className="h-64">

        <ResponsiveContainer>

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

            <XAxis dataKey="topic" stroke="#94a3b8" />

            <YAxis stroke="#94a3b8" />

            <Tooltip />

            <Bar dataKey="count" fill="#22c55e" />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default TopicBarChart;