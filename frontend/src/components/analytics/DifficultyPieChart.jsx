import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

function DifficultyPieChart({ title = "Difficulty Distribution", data }) {

  const hasData = data && data.length > 0 && data.reduce((acc, curr) => acc + curr.value, 0) > 0;

  return (

    <div className="bg-[#0f172a] border border-white/10 rounded-xl p-6">

      <h2 className="text-white mb-4">{title}</h2>

      <div className="h-64 flex items-center justify-center">

        {hasData ? (

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
            >

              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

        ) : (

          <p className="text-gray-400">Let's start doing questions!</p>

        )}

      </div>

    </div>

  );

}

export default DifficultyPieChart;