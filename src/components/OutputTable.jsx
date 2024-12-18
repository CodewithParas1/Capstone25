const OutputTable = ({ outputTable }) => {
  return (
    <div className="mt-8 pb-24 ml-10 mr-10">
      <h2 className="font-serif text-4xl text-gray-800 mb-6 text-center">Prediction Results</h2>
      {/* Add scrolling for long tables */}
      <div className="overflow-y-scroll max-h-96 shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead className="sticky top-0 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <th className="border px-8 py-6 text-2xl font-semibold">Peptide</th>
              <th className="border px-8 py-6 text-2xl font-semibold">Start</th>
              <th className="border px-8 py-6 text-2xl font-semibold">End</th>
              <th className="border px-8 py-6 text-2xl font-semibold">Peptide Length</th>
              <th className="border px-8 py-6 text-2xl font-semibold">Allele(s)</th>
              <th className="border px-8 py-6 text-2xl font-semibold">Ic50 Score</th>
            </tr>
          </thead>
          <tbody>
            {outputTable.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-100 transition-all duration-200 ease-in-out`}
              >
                <td className="border px-8 py-6 text-xl text-gray-700">{row.peptide}</td>
                <td className="border px-8 py-6 text-xl text-gray-700">{row.start}</td>
                <td className="border px-8 py-6 text-xl text-gray-700">{row.end}</td>
                <td className="border px-8 py-6 text-xl text-gray-700">{row.length}</td>
                <td className="border px-8 py-6 text-xl text-gray-700">{row.allele}</td>
                <td className="border px-8 py-6 text-xl text-gray-700">{row.ic50_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OutputTable;