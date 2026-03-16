function ProblemRow({ problem }) {

  return (

    <tr className="border-b border-white/10">

      <td className="p-3 text-white">
        {problem.title}
      </td>

      <td className="p-3 text-gray-400">
        {problem.platform}
      </td>

      <td className="p-3 text-gray-400">
        {problem.difficulty}
      </td>

      <td className="p-3 text-green-400">
        Solved
      </td>

    </tr>

  );

}

export default ProblemRow;