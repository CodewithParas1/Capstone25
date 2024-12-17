import React from 'react'


const PredictionParameters = ({
  peptideLength,
  setPeptideLength,
  mhcAllele,
  setMhcAllele,
  mhcAlleles,
  setMhcAlleles,
  selectedModel,
  setSelectedModel,
  handleRun,
  handleReset,
}) => {
  const handleMhcAlleleChange = () => {
    if (mhcAllele && !mhcAlleles.includes(mhcAllele)) {
      setMhcAlleles([...mhcAlleles, mhcAllele]);
      setMhcAllele('');
    }
  };

  const removeMhcAllele = (allele) => {
    setMhcAlleles(mhcAlleles.filter((item) => item !== allele));
  };

  // Handle peptide length changes
  const handlePeptideLengthChange = (e) => {
    const newValue = [...peptideLength];
    newValue[0] = parseInt(e.target.value); // Directly bind to the first value of peptideLength
    setPeptideLength(newValue);
  };

  return (
    <div className="mt-20">
      <h2 className="font-bold text-3xl">Selecting Prediction Parameters  - </h2>

      {/* Peptide Length Slider */}
      <div className="mt-5">
        <label>Peptide Length</label>
        <input
          type="range"
          min="8"
          max="11"
          step="1"  // Stepping by whole numbers for clarity
          value={peptideLength[0]}  // Bind to the first value in the peptideLength array
          onChange={handlePeptideLengthChange}
          className="w-2/3 appearance-none h-1 bg-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300" // Smaller slider height (h-1)
        />
        <div className="mt-5">{peptideLength[0]} - {peptideLength[1]}</div>
      </div>

      {/* MHC Alleles */}
      <div className="mt-4 flex items-center">
        <label className="w-1/4">MHC Allele(s) ---------   </label>
        <input
          type="text"
          value={mhcAllele}
          onChange={(e) => setMhcAllele(e.target.value)}
          placeholder="Ex: HLA-A*02:01"
          className="w-2/5 border border-gray-300 px-2 py-1 ml-2 rounded-md"
  />    
        <button className="ml-2 bg-blue-500 text-white px-4 py-2" onClick={handleMhcAlleleChange}>Add Allele</button>
        <div className="mt-2">
          {mhcAlleles.map((allele, index) => (
            <div key={index}>
              {allele} <button className="text-red-500" onClick={() => removeMhcAllele(allele)}>✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Model Selector */}
<div className="mt-10 flex items-center">
  <label className="w-1/4">Prediction Model</label>
  <select
    value={selectedModel}
    onChange={(e) => setSelectedModel(e.target.value)}
    className="ml-2 w-2/4 border border-gray-300 px-4 py-2 rounded-md"
  >
    <option value="ANN">ANN</option>
    <option value="RNN">RNN</option>
  </select>
</div>


      {/* Run and Reset */}
      <div className="flex justify-center space-x-6 mt-12 mb-8">
        <button
          className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-200 transform hover:scale-110"
          onClick={handleRun}
        >
          Run
        </button>
        <button
          className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-200 transform hover:scale-110"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PredictionParameters;

