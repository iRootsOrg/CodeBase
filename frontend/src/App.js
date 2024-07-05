import logo from "./logo.svg";
import "./App.css";
import Output from "./Components/Output.jsx";
import CodeEditor from "./Components/CodeEditor";
import ToolBar from "./Components/ToolBar.jsx";
import TestCase from "./Components/TestCase.jsx";
import { useState, useEffect } from "react";
import Folder from "./Components/Folder.jsx";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import light from "react-syntax-highlighter/dist/cjs/light.js";

function App() {
  const [testcaseOpen, setTestCaseOpen] = useState(false);
  const [testCases, setTestCases] = useState({
    textArea1: "",
    textArea2: "",
    textArea3: "",
    textArea4: "",
  });
  const [language, setLanguage] = useState("js");

  const [value, setValue] = useState("");
  const [opennewfolder, setOpenNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [boilerplatecode, setBoilerPlateCode] = useState(true);

  const [notify, setNotify] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgpositive, setMsgPositive] = useState(true);

  const [shareopen, setShareOpen] = useState(true);

  const [folderopen, setFolderOpen] = useState(false);
  const [folderfiles, setFolderFiles] = useState([
    {
      name: "Folder1",
      files: [
        {
          name: "File1",
          code: "Hello fdg",
          language: "js",
        },
        {
          name: "File2",
          code: "He",
          language: "ts",
        },
      ],
    },
  ]);
  //Sample Folders
const [lightmode, setLightMode] = useState(true);

const handleLight = () => {
  setLightMode(!lightmode);
};
  const [folderIndex, setFolderIndex] = useState(-1);
  const [fileIndex, setFileIndex] = useState(-1);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const closeMsg = () => {
    setNotify(false);
    setMsg("");
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    console.log(files);

    setNotify(true);
    setMsg("Files Uploaded Successfully");
    const time = setTimeout(() => {
      closeMsg();
    }, 4000);
  };

  

  // useEffect(() => {
  //   setTimeout(() => {
  //     closeMsg();
  //   }, 3000);
  // },[notify])

  const handleClick = () => {
    setTestCaseOpen(!testcaseOpen);
  };

  const handleFolderName = (e) => {
    console.log(e.target.value);
    setNewFolderName(e.target.value);
  };

  const addNewFolder = () => {
    setFolderFiles([
      ...folderfiles,
      {
        name: `${newFolderName}`,
        files: [],
      },
    ]);

    setOpenNewFolder(false);
    setNewFolderName("");
  };

  const updateChangeCode = () => {
    const updateFileCode = (folderIndex, fileIndex, newCode, newlanguage) => {
      setFolderFiles((prevFolderFiles) => {
        return prevFolderFiles.map((folder, fIndex) => {
          if (fIndex === folderIndex) {
            return {
              ...folder,
              files: folder.files.map((file, fiIndex) => {
                if (fiIndex === fileIndex) {
                  return {
                    ...file,
                    code: newCode,
                    language: newlanguage,
                  };
                }
                return file;
              }),
            };
          }
          return folder;
        });
      });
    };

    // Usage example:
    updateFileCode(folderIndex, fileIndex, value, language);

    //Post request bhejna
  };

  const zipAndDownload = () => {
    const zip = new JSZip();
    if (folderIndex === -1 && fileIndex === -1) {
      folderfiles.forEach((folder) => {
        const folderZip = zip.folder(folder.name);
        folder.files.forEach((file) => {
          folderZip.file(`${file.name}.${file.language}`, file.code);
        });
      });

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "files.zip");
      });
    } else if (
      folderIndex >= 0 &&
      folderIndex < folderfiles.length &&
      fileIndex === -1
    ) {
      const folder = folderfiles[folderIndex];
      const folderZip = zip.folder(folder.name);

      folder.files.forEach((file) => {
        folderZip.file(`${file.name}.${file.language}`, file.code);
      });

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, `${folder.name}.zip`);
      });
    } else {
      const folder = folderfiles[folderIndex];
      if (fileIndex >= 0 && fileIndex < folder.files.length) {
        const file = folder.files[fileIndex];
        const blob = new Blob([file.code], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(blob, `${file.name}.${file.language}`);
      } else {
        console.error("Invalid file index");
      }
    }
  };

  return (
    <div className="flex h-screen">
      <ToolBar
        folderopen={folderopen}
        setFolderOpen={setFolderOpen}
        value={value}
        setValue={setValue}
        updateChangeCode={updateChangeCode}
        zipAndDownload={zipAndDownload}
        handleFileUpload={handleFileUpload}
        lightmode={lightmode}
        setLightMode={setLightMode}
        handleLight={handleLight}
        shareopen={shareopen}
        setShareOpen={setShareOpen}
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
                value={value}
                setValue={setValue}
                folderIndex={folderIndex}
                setFolderIndex={setFolderIndex}
                fileIndex={fileIndex}
                setFileIndex={setFileIndex}
                language={language}
                setLanguage={setLanguage}
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
            <CodeEditor
              value={value}
              setValue={setValue}
              language={language}
              setLanguage={setLanguage}
              boilerplatecode={boilerplatecode}
              setBoilerPlateCode={setBoilerPlateCode}
              lightmode={lightmode}
              setLightMode={setLightMode}
              handleLight={handleLight}
            />
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

          {notify === true ? (
            <div
              className={`z-10 rounded-lg absolute bottom-2 left-[42%] h-32 w-64 shadow-3xl font-semibold text-white ${
                msgpositive === true
                  ? " bg-gradient-to-r from-green-500 via-green-500 to-green-300 "
                  : " bg-gradient-to-r from-rose-500 via-rose-500 to-rose-300 "
              } text-center text-wrap `}
            >
              <div className="flex justify-end p-1  animate-pulse">
                <button
                  className="text-black"
                  onClick={() => {
                    closeMsg();
                  }}
                >
                  ⚫
                </button>
              </div>
              <div className="flex justify-center h-16 items-center shadow-3xl  animate-pulse ">
                {msg}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {shareopen === true ? (
        <div className="relative">
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800"
              onClick={setShareOpen(false)}
            >
              &times;
            </button>
            <p className="mb-4">Share this content!</p>
            <div className="flex space-x-4">
              <button className="bg-blue-700 text-white px-4 py-2 rounded">
                Facebook
              </button>
              <button className="bg-blue-400 text-white px-4 py-2 rounded">
                Twitter
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded">
                Email
              </button>
            </div>
          </div>
          </div>
          </div>
      ) : (
        <div>Hello</div>
      )}
    </div>
  );
}

export default App;
