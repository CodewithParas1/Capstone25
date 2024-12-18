import React, { useState } from 'react';
import Header from './components/Header';
import SequenceInput from './components/SequenceInput';
import FileControls from './components/FileControls';
import PredictionParameters from './components/PredictionParameters';
import OutputTable from './components/OutputTable';

const App = () => {
  const [fileContent, setFileContent] = useState(''); 
  const [peptideLength, setPeptideLength] = useState([8, 10]); 
  const [mhcAllele, setMhcAllele] = useState(''); 
  const [mhcAlleles, setMhcAlleles] = useState([]); 
  const [selectedModel, setSelectedModel] = useState('NetMHCpan 4.1 EL');
  const [showTable, setShowTable] = useState(false); 
  const [outputTable, setOutputTable] = useState([]); 

  const handleRun = () => {
    const tableData = [
      // {
      //   seq: 'ATCG',
      //   peptide: 'ATC',
      //   start: 1,
      //   end: 3,
      //   peptideLength: peptideLength.join(' - '),
      //   allele: mhcAlleles.join(', '),
      //   medianBindPercentile: '10%',
      //   netMHCspanScore: '0.8',
      //   netMHCspanPercentile: '15%',
      // },
      
    ];

    setOutputTable(tableData);
    setShowTable(true);
  };

  const handleReset = () => {
    setFileContent('');
    setPeptideLength([8, 10]);
    setMhcAlleles([]);
    setSelectedModel('NetMHCpan 4.1 EL');
    setShowTable(false);
    setOutputTable([]);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="flex flex-col md:flex-row justify-between p-6">
        <div className="left-content w-full md:w-2/3 mx-auto text-center">
          <SequenceInput fileContent={fileContent} setFileContent={setFileContent} />
          <FileControls fileContent={fileContent} setFileContent={setFileContent} />
          <PredictionParameters
            peptideLength={peptideLength}
            setPeptideLength={setPeptideLength}
            mhcAllele={mhcAllele}
            setMhcAllele={setMhcAllele}
            mhcAlleles={mhcAlleles}
            setMhcAlleles={setMhcAlleles}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            handleRun={handleRun}
            handleReset={handleReset}
          />
        </div>
      </div>
      {showTable && <OutputTable outputTable={outputTable} />}
    </div>
  );
};

export default App;
