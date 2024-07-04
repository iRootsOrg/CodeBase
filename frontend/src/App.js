import logo from "./logo.svg";
import "./App.css";
import Output from "./Components/Output.jsx";
import CodeEditor from "./Components/CodeEditor";
import ToolBar from "./Components/ToolBar.jsx";
import TestCase from "./Components/TestCase.jsx";
import { useState,useEffect } from "react";
import Folder from "./Components/Folder.jsx";

function App() {
  const [testcaseOpen, setTestCaseOpen] = useState(false);
  const [testCases, setTestCases] = useState({
    textArea1: "",
    textArea2: "",
    textArea3: "",
    textArea4: "",
  });


  const [folderopen, setFolderOpen] = useState(false);
  const [folderfiles, setFolderFiles] = useState([
    {
      name: "Folder1",
      files: [
        {
          name: "File1",
          code: "Code1",
        },
      ],
    },
  ]);
  //Sample Folders
  const [value, setValue] = useState("");
  const [opennewfolder, setOpenNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const handleClick = () => {
    setTestCaseOpen(!testcaseOpen);
  };

  const handleFolderName = (e) => {
    console.log(e.target.value);
    setNewFolderName(e.target.value);
  };

  const addNewFolder = () => {
    setFolderFiles([...folderfiles,
    {
      name: `${newFolderName}`,
      files: [],
    }
    ])

    setOpenNewFolder(false);
    setNewFolderName('');
  };


  

  return (
    <div className="flex h-screen">
      <ToolBar
        folderopen={folderopen}
        setFolderOpen={setFolderOpen}
        value={value}
        setValue={setValue}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          {folderopen === true ? (
            <div className="w-48 bg-gray-100 ">
              <Folder
                folderfiles={folderfiles}
                setFolderFiles={setFolderFiles}
                opennewfolder={opennewfolder}
                setOpenNewFolder={setOpenNewFolder}
              />

              {opennewfolder === true ? (
                <div className="flex gap-2 hover:text-blue-600 font-semibold text-lg p-2 w-full items-center">
                  <div>📁</div>
                  <input
                    value={newFolderName}
                    onChange={(e) => {
                      handleFolderName(e);
                    }}
                    className="w-20 focus:outline-none"
                  ></input>

                  <button
                    onClick={() => {
                      addNewFolder();
                    }}
                  >
                    ✔️
                  </button>
                  <button
                    onClick={() => {
                      setOpenNewFolder(false);
                      setNewFolderName("");
                    }}
                  >
                    🗑️
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          <div className="flex-1 h-full ">
            <CodeEditor value={value} setValue={setValue} />
          </div>
          <div className="w-1 bg-gray-300 cursor-ew-resize"></div>
          <div className="flex-1 h-full overflow-y-auto">
            <Output />
          </div>
        </div>
        {/* <div className="bg-gray-100">
          <div className="flex p-4 justify-between mb-0">
            <label for="testcases" className="font-bold text-xl">
              Test Cases :
            </label>
            <button
              onClick={() => {
                handleClick();
              }}
            >
              <img
                src={
                  testcaseOpen === true ? "./Icons/Down.png" : "./Icons/Up.png"
                }
                alt="Arrow"
                className="h-[32px] w-[32px]"
              ></img>
            </button>
          </div>
          {testcaseOpen === true ? (
            <TestCase testCases={testCases} setTestCases={setTestCases} />
          ) : (
            ""
          )}
        </div> */}
      </div>
      <div></div>
    </div>
  );
}

export default App;
