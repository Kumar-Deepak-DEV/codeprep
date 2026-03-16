import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function WeeklyProgressChart({ data }) {

  return (

    <div className="bg-[#0f172a] border border-white/10 rounded-xl p-6">

      <h2 className="text-white mb-4">Weekly Progress</h2>

      <div className="h-64">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

            <XAxis dataKey="day" stroke="#94a3b8" />

            <YAxis stroke="#94a3b8" allowDecimals={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="solved"
              stroke="#3b82f6"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default WeeklyProgressChart;