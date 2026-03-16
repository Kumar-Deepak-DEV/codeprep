import ProblemRow from "./ProblemRow";

function ProblemTable({ problems }) {

  return (

    <table className="w-full bg-[#020617] border border-white/10 rounded-xl overflow-hidden">

      <thead className="bg-[#0f172a]">

        <tr>

          <th className="p-3 text-left text-gray-400">Problem</th>
          <th className="p-3 text-left text-gray-400">Platform</th>
          <th className="p-3 text-left text-gray-400">Difficulty</th>
          <th className="p-3 text-left text-gray-400">Status</th>

        </tr>

      </thead>

      <tbody>

        {problems.map((problem, index) => (

          <ProblemRow key={index} problem={problem} />

        ))}

      </tbody>

    </table>

  );

}

export default ProblemTable;