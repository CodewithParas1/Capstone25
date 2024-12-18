const SequenceInput = ({ fileContent, setFileContent }) => {
  return (
    <textarea
      rows={2}
      cols={15}
      className="w-full border border-gray-300 p-2 rounded-md"
      placeholder="Enter or upload sequences here..."
      value={fileContent}
      onChange={(e) => setFileContent(e.target.value)}
    />
  );
};

export default SequenceInput;