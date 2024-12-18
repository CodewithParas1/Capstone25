import React from 'react'

const FileControls = ({ fileContent, setFileContent }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => setFileContent(event.target.result);
    if (file) reader.readAsText(file);
  };

  const handleFileDownload = (type) => {
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sequence.${type}`;
    link.click();
  };

  return (
    <div className="mt-4">
      <input type="file" accept=".txt,.json,.fasta" onChange={handleFileUpload} />
      <div className="flex space-x-2 mt-5 justify-center">
        <button
          className="bg-green-500 text-white px-4 py-2 transition-transform duration-300 transform hover:scale-105 hover:bg-green-600"
          onClick={() => handleFileDownload('txt')}
          disabled={!fileContent}
        >
          Download .txt
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 transition-transform duration-300 transform hover:scale-105 hover:bg-blue-600"
          onClick={() => handleFileDownload('json')}
          disabled={!fileContent}
        >
          Download .json
        </button>
        <button
          className="bg-purple-500 text-white px-4 py-2 transition-transform duration-300 transform hover:scale-105 hover:bg-purple-600"
          onClick={() => handleFileDownload('fasta')}
          disabled={!fileContent}
        >
          Download .fasta
        </button>
      </div>
    </div>
  );
  
};

export default FileControls;
