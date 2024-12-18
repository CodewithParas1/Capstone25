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

  const handlePeptideLengthChange = (e) => {
    const newValue = [...peptideLength];
    newValue[0] = parseInt(e.target.value);
    setPeptideLength(newValue);
  };

  return (
    <div className="mt-20">
      <h3 className="font-serif text-3xl wtext-white">Selecting Prediction Parameters  - </h3>
     <div className="mt-4 flex items-center">
        <label className="w-1/4">MHC Allele(s)</label>
        <select
            value={mhcAllele}
            onChange={(e) => setMhcAllele(e.target.value)}
            className="w-2/5 border border-gray-300 px-2 py-1 ml-2 rounded-md"
        >
            <option value="" disabled>Select an allele</option>
            <option value="HLA-A*01:01">HLA-A*01:01</option>
            <option value="HLA-A*02:01">HLA-A*02:01</option>
            <option value="HLA-A*03:01">HLA-A*03:01</option>
            <option value="HLA-A*11:01">HLA-A*11:01</option>
            <option value="HLA-A*24:02">HLA-A*24:02</option>
            <option value="HLA-B*07:02">HLA-B*07:02</option>
            <option value="HLA-B*08:01">HLA-B*08:01</option>
            <option value="HLA-B*15:01">HLA-B*15:01</option>
        </select>
   
        <button className="ml-2 bg-blue-500 text-white px-4 py-2" onClick={handleMhcAlleleChange}>Add Allele</button>
        <div className="mt-2">
          {mhcAlleles.map((allele, index) => (
            <div key={index}>
              {allele} <button className="text-red-500" onClick={() => removeMhcAllele(allele)}>✕</button>
            </div>
          ))}
        </div>
      </div>

  <div className="mt-4 flex items-center">
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

