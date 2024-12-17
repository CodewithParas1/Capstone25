import React from 'react';
import { useRanger } from 'react-ranger';

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

  // Multi-range slider logic
  const { getTrackProps, handles } = useRanger({
    values: peptideLength,
    onChange: setPeptideLength,
    min: 8,
    max: 11,
    stepSize: 1,
  });

  return (
    <div className="mt-20">
      <h2 className="font-bold text-3xl">Selecting Prediction Parameters -</h2>

      {/* Peptide Length Multi-Range Slider */}
      <div className="mt-5">
        <label className="block text-lg font-medium mb-2">Peptide Length</label>
        <div
          {...getTrackProps({
            style: {
              height: '4px',
              background: '#ddd',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,.6)',
              borderRadius: '2px',
              position: 'relative',
            },
          })}
        >
          {handles.map(({ getHandleProps }) => (
            <div
              {...getHandleProps({
                style: {
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'linear-gradient(to bottom, #eee 45%, #ddd 55%)',
                  border: 'solid 1px #888',
                  position: 'absolute',
                  top: '-5px',
                  transform: 'translateX(-50%)',
                },
              })}
            />
          ))}
        </div>
        <div className="mt-4 text-lg">
          Selected Range: <strong>{peptideLength[0]} - {peptideLength[1]}</strong>
        </div>
      </div>

      {/* MHC Alleles */}
      <div className="mt-4 flex items-center">
        <label className="w-1/4">MHC Allele(s)</label>
        <input
          type="text"
          value={mhcAllele}
          onChange={(e) => setMhcAllele(e.target.value)}
          placeholder="Ex: HLA-A*02:01"
          className="w-2/5 border border-gray-300 px-2 py-1 ml-2 rounded-md"
        />
        <button
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleMhcAlleleChange}
        >
          Add Allele
        </button>
      </div>
      <div className="mt-2">
        {mhcAlleles.map((allele, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span>{allele}</span>
            <button
              className="text-red-500"
              onClick={() => removeMhcAllele(allele)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Prediction Model Selector */}
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

      {/* Run and Reset Buttons */}
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
