import React, { useState } from 'react';
import Output from './Output';
import { FaTimes } from "react-icons/fa";

const TestCaseEditor = () => {
  const [testCases, setTestCases] = useState([
    { id: 1, name: 'Test Case 1', content: 'Input for Test Case 1...' },
    { id: 2, name: 'Test Case 2', content: 'Input for Test Case 2...' },
  ]);
  const [selectedTestCase, setSelectedTestCase] = useState(testCases[0]);
  const [testResults, setTestResults] = useState([]);
  const [selectedTestResult, setSelectedTestResult] = useState(null);
  const [testMode, setTestMode] = useState('testCases');
  const [testsRun, setTestsRun] = useState(false);
  const [reportBugOpen, setReportBugOpen] = useState(false);
  const [lightmode, setLightMode] = useState(true);

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
    if (testCases.length === 0) {
      return; 
    }
    const results = testCases.map((testCase, index) => ({
      id: testCase.id,
      name: `Test Result ${index + 1}`,
      result: `Output for ${testCase.name}...`
    }));
    setTestResults(results);
    setTestsRun(true);
    setTestMode('testResults');
    setSelectedTestResult(results[0]);
  };

  const handleTestCaseClick = (id) => {
    const testCase = testCases.find((testCase) => testCase.id === id);
    setSelectedTestCase(testCase);
    setTestMode('testCases');
  };

  const handleTestResultClick = (id) => {
    const result = testResults.find(result => result.id === id);
    setSelectedTestResult(result);
  };

  return (
    <div className="flex flex-col h-screen mr-14 py-4 px-2 mt-8">
      <select
        className="text-base text-gray-800 focus:outline-none mb-0.5 mr-2 w-1/5"
        value={testMode}
        onChange={(e) => setTestMode(e.target.value)}
      >
        <option value="testCases">Test Cases</option>
        {testsRun && <option value="testResults">Test Results</option>}
      </select>

      {testMode === 'testCases' && (
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
            className="ml-auto px-3 py-1 md:text-sm text-white font-bold bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 rounded-md mr-1 focus:outline-none"
            onClick={handleRunTests}
            disabled={testCases.length === 0}
          >
            Run Tests
          </button>
        </div>
      )}
      {testMode === 'testResults' && (
        <div className="bg-neutral-100 flex h-8 items-center mt-4">
          <div className="flex flex-wrap max-h-20 overflow-y-auto">
            {testResults.map((result) => (
              <button
                key={result.id}
                className={`mr-2 text-xs sm:text-sm text-gray-800 px-3 py-1 ${selectedTestResult?.id === result.id ? ' bg-slate-100 font-bold' : ''}`}
                onClick={() => handleTestResultClick(result.id)}
              >
                {result.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {testMode==='testResults'&&selectedTestResult && (
        <div>
        <Output result={selectedTestResult.result} />
        <button className={`p-2.5 `} onClick={() => { setReportBugOpen(true); }}>🐞 Report Bug</button>
      </div>
      )}
      {testMode === 'testCases' && selectedTestCase && (
        <textarea
          className="bg-slate-100 text-sm text-gray-600 shadow-md py-2 rounded-lg px-2 resize-none min-h-400 focus:outline-none"
          placeholder="Your inputs here..."
          value={selectedTestCase.content}
          readOnly
          style={{ borderRadius: '8px', borderTopLeftRadius: 0, borderTopRightRadius: 0, height: '400px' }}
        />
      )}
     {reportBugOpen === true ? (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div
      className={`bg-gray-900 bg-opacity-70 backdrop-blur-lg border ${
        lightmode
          ? "bg-gray-100 bg-opacity-90 text-black border-black"
          : "bg-[#1e1e1e] bg-opacity-90 text-white border-white"
      } p-6 rounded-lg shadow-lg relative w-[70vw]`}
    >
      <div className="flex items-center">
        <button
          onClick={() => {
            setReportBugOpen(false);
          }}
          className={`absolute top-3 right-2 ${
            lightmode
              ? "text-black hover:text-gray-700"
              : "text-white hover:text-gray-200"
          }`}
        >
          <FaTimes size={24} />
        </button>
        <h2 className={`text-xl font-bold top-3 left-[45%] absolute `}>
          Report Bug
        </h2>
      </div>

      <form
        action="POST"
        className="flex flex-col gap-3 mt-4 font-semibold w-full"
      >
        <p>Tell us some details:</p>
        <label>Name :</label>
        <input
          type="text"
          placeholder="Name"
          name="Name"
          className={`p-2 border rounded-md ${
            lightmode ? "bg-gray-200" : "bg-black"
          }`}
        ></input>
        <label>Email :</label>
        <input
          type="email"
          placeholder="Email"
          name="Email"
          className={`p-2 border rounded-md ${
            lightmode ? "bg-gray-200" : "bg-black"
          }`}
        ></input>
        <label>Tell us what issue/bug, you met :</label>
        <textarea
          type="text"
          placeholder="Issue"
          name="Issue"
          className={`p-2 border rounded-md ${
            lightmode ? "bg-gray-200" : "bg-black"
          }`}
          rows={6}
        ></textarea>
        <div className="flex justify-end pr-2 w-full">
          <button
            className={`block w-24 px-2 py-1 text-center rounded ${
              lightmode
                ? "bg-custom-gradient"
                : "bg-custom-gradient-inverted"
            } text-white`}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
) : (
  ""
)}

     </div>
  );
};

export default TestCaseEditor;
