import React from 'react';
import Output from '../Components/Output.jsx';
import CodeEditor from '../Components/CodeEditor.jsx';
import ToolBar from '../Components/ToolBar.jsx';
import TestCase from '../Components/TestCase.jsx';

import { useState } from 'react';



function EditorPage() {

  const [testcaseOpen, setTestCaseOpen] = useState(false);
  const [testCases, setTestCases] = useState({
    textArea1: "",
    textArea2: "",
    textArea3: "",
    textArea4: "",
  });

  const handleClick = () => {
    setTestCaseOpen(!testcaseOpen);
  }

  return (
    <div className="flex h-screen">
      <ToolBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 h-full ">
            <CodeEditor />
          </div>
          <div className="w-1 bg-gray-300 cursor-ew-resize"></div>
          <div className="flex-1 h-full overflow-y-auto">
            <Output />
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="flex p-4 justify-between mb-0">
            <label for="testcases" className="font-bold text-xl">
              Test Cases :
            </label>
            <button onClick={() => {handleClick()}}><img src={testcaseOpen === true ? "./Icons/Down.png" : "./Icons/Up.png"} alt="Arrow" className="h-[32px] w-[32px]"></img></button>
          </div>
          {testcaseOpen === true ? <TestCase testCases={testCases} setTestCases={setTestCases} /> : ""}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default EditorPage;
