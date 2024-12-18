import React, { useState } from 'react';
import Header from './components/Header';
import SequenceInput from './components/SequenceInput';
import FileControls from './components/FileControls';
import PredictionParameters from './components/PredictionParameters';
import OutputTable from './components/OutputTable';
import '../styles/app.css'

const App = () => {
  const [fileContent, setFileContent] = useState(''); 
  const [peptideLength, setPeptideLength] = useState([8, 10]); 
  const [mhcAllele, setMhcAllele] = useState(''); 
  const [mhcAlleles, setMhcAlleles] = useState([]); 
  const [selectedModel, setSelectedModel] = useState('NetMHCpan 4.1 EL');
  const [showTable, setShowTable] = useState(false); 
  const [outputTable, setOutputTable] = useState([]); 

  const parseResponse = (response) => {
    // Split the response into lines
    const lines = response.trim().split('\n');

    // Extract the header row and split into keys
    const headers = lines[0].trim().split(/\s+/);

    // Process each subsequent line as a data row
    const data = lines.slice(1).map(line => {
      const values = line.trim().split(/\s+/);
      // Create an object mapping headers to values
      return headers.reduce((obj, key, index) => {
        obj[key] = isNaN(values[index]) ? values[index] : parseFloat(values[index]);
        return obj;
      }, {});
    });

    return data;
  };

  const handleRun = async () => {
    try {
      if(fileContent.length === 0) throw new Error('Please provide sequence');
      if(mhcAlleles.length === 0) throw new Error('Please choose allele type');

      const dataToSend = new URLSearchParams({
        method: 'recommended',
        sequence_text: fileContent,
        allele: mhcAlleles.join(','),
        length: '9'
      });

      const response = await fetch('http://tools-cluster-interface.iedb.org/tools_api/processing/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: dataToSend.toString(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${response.statusText}\n${errorText}`);
      }

      const result = await response.text();
      console.log('Server Response:', result);

      setOutputTable(parseResponse(result));
      setShowTable(true);
    } catch (error) {
      console.error('Error during fetch:', error);
      alert(`${error.message}`);
    }
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
      <div className="flex flex-col md:flex-row justify-between p-6 yashas">
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
