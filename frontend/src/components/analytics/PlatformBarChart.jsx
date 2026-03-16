import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function PlatformBarChart({ data }) {

  return (

    <div className="bg-[#0f172a] border border-white/10 rounded-xl p-6">

      <h2 className="text-white mb-4">Platform Comparison</h2>

      <div className="h-64">

        <ResponsiveContainer>

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

            <XAxis dataKey="platform" stroke="#94a3b8" />

            <YAxis stroke="#94a3b8" />

            <Tooltip />

            <Bar dataKey="solved" fill="#3b82f6" />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default PlatformBarChart;