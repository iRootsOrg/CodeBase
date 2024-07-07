import React, { useState } from 'react';

const TestCaseEditor = () => {
  const [testCases, setTestCases] = useState([
    { id: 1, name: 'Test Case 1', content: 'Input for Test Case 1...' },
    { id: 2, name: 'Test Case 2', content: 'Input for Test Case 2...' },
  ]);
  const [selectedTestCase, setSelectedTestCase] = useState(testCases[0]);

  const handleAddTestCase = () => {
    const newTestCase = {
      id: testCases.length + 1,
      name: `Test Case ${testCases.length + 1}`,
      content: '',
    };
    setTestCases([...testCases, newTestCase]);
  };

  const handleRemoveTestCase = (id) => {
    const updatedTestCases = testCases.filter((testCase) => testCase.id !== id);
    setTestCases(updatedTestCases);
    if (selectedTestCase && selectedTestCase.id === id) {
      setSelectedTestCase(null);
    }
  };

  const handleRunTests = () => {
    console.log('Running tests...');
  };

  const handleTestCaseClick = (id) => {
    const testCase = testCases.find((testCase) => testCase.id === id);
    setSelectedTestCase(testCase);
  };

  return (
    <div className="flex flex-col h-screen mr-14 py-4 px-2 mt-8">
      <p className="text-base font-actor">Test Cases:</p>
      <div className="bg-neutral-100 flex h-8 items-center mt-4">
        <div className="flex flex-wrap max-h-20 overflow-y-auto">
          {testCases.map((testCase) => (
            <div key={testCase.id} className={`flex items-center mr-2 mb-2 ${selectedTestCase?.id === testCase.id ? 'bg-slate-100 ' : ''}`}>
              <button
                className={`text-xs sm:text-sm text-gray-800 px-3 py-1 ${selectedTestCase?.id === testCase.id ? 'font-bold' : ''}`}
                onClick={() => handleTestCaseClick(testCase.id)}
              >
                {testCase.name}
              </button>
              <button
                className="ml-2 py-1 h-6 w-6 text-gray-800 focus:outline-none flex items-center justify-center"
                onClick={() => handleRemoveTestCase(testCase.id)}
              >
                &#10005;
              </button>
            </div>
          ))}
          <button
            className="ml-2 text-gray-800 focus:outline-none"
            onClick={handleAddTestCase}
          >
            +
          </button>
        </div>
        <button
          className="ml-auto px-3 py-1 md:text-sm text-white font-bold bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 rounded-full focus:outline-none"
          onClick={handleRunTests}
          disabled={!selectedTestCase}
        >
          Run Tests
        </button>
      </div>
      <textarea
        className="bg-slate-100 text-sm text-gray-600 shadow-md py-2 rounded-lg px-2 resize-none min-h-400 focus:outline-none"
        placeholder="Your inputs here..."
        value={selectedTestCase ? selectedTestCase.content : ''}
        readOnly={!selectedTestCase}
        style={{ borderRadius: '8px', borderTopLeftRadius: 0, borderTopRightRadius: 0, height: '400px' }}
      />
    </div>
  );
};

export default TestCaseEditor;
