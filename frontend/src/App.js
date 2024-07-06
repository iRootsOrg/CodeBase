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
import Run from "./Components/Run.jsx";
import RunAll from "./Components/RunAll.jsx"
import { FaFacebook, FaTwitter, FaWhatsapp, FaTimes } from "react-icons/fa";


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

  const [shareOpen, setShareOpen] = useState(false);

  const [newFileName, setNewFileName] = useState("");
  const [opennewfile, setOpenNewFile] = useState(false);

  const [openExtraNewFile, setOpenExtraNewFile] = useState(false);
  const [extraNewFileName, setExtraNewFileName] = useState("");

  

  const [folderopen, setFolderOpen] = useState(false);
  const [folderfiles, setFolderFiles] = useState({
    folders: [
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
      {
        name: "Folder2",
        files: [
          {
            name: "File21",
            code: "lorem  ipsum fdfdsf",
            language: "js",
          },
          {
            name: "File22",
            code: "He jkbdv dvdvdfdf",
            language: "ts",
          },
        ],
      },
    ],
    extraFiles: [
      {
        name: "ExtraFile1",
        code: "Extra file code",
        language: "js",
      },
      {
        name: "ExtraFile2",
        code: "More extra file code",
        language: "ts",
      },
    ],
  });

  //Sample Folders
  const [lightmode, setLightMode] = useState(true);

  const handleLight = () => {
    setLightMode(!lightmode);
  };
  const [folderIndex, setFolderIndex] = useState(-1);
  const [fileIndex, setFileIndex] = useState(-1);
  const [extraFileIndex, setExtraFileIndex] = useState(-1);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const closeMsg = () => {
    setNotify(false);
    setMsg("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("https://example.com");
    alert("URL copied to clipboard!");
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
    setFolderFiles((prevState) => ({
      ...prevState,
      folders: [
        ...prevState.folders,
        {
          name: newFolderName,
          files: [],
        },
      ],
    }));

    setOpenNewFolder(false);
    setNewFolderName("");
  };

const updateChangeCode = () => {
  const updateFileCode = (folderIndex, fileIndex,extraFileIndex, newCode, newLanguage) => {
    setFolderFiles((prevFolderFiles) => {
  
      if (folderIndex === -1) {
        // Update extraFiles
        const newExtraFiles = prevFolderFiles.extraFiles.map(
          (file, fiIndex) => {
            if (fiIndex === extraFileIndex) {
              console.log("Updating extra file:", file.name);
              return {
                ...file,
                code: newCode,
                language: newLanguage,
              };
            }
            return file;
          }
        );
        console.log("Updated extraFiles:", newExtraFiles);
        return {
          ...prevFolderFiles,
          extraFiles: newExtraFiles,
        };
      } else {
        // Update files within a folder
        const newFolders = prevFolderFiles.folders.map((folder, fIndex) => {
          if (fIndex === folderIndex) {
            return {
              ...folder,
              files: folder.files.map((file, fiIndex) => {
                if (fiIndex === fileIndex) {
                  console.log(
                    "Updating file in folder:",
                    folder.name,
                    file.name
                  );
                  return {
                    ...file,
                    code: newCode,
                    language: newLanguage,
                  };
                }
                return file;
              }),
            };
          }
          return folder;
        });

        console.log("Updated folders:", newFolders);
        return {
          ...prevFolderFiles,
          folders: newFolders,
        };
      }
    });
  };

  // Ensure folderIndex, fileIndex, value, and language are defined
  if (
    typeof folderIndex === "number" &&
    typeof fileIndex === "number" &&
    value &&
    language
  ) {
    // Usage example:
    updateFileCode(folderIndex, fileIndex,extraFileIndex, value, language);

    // Post request sending can be implemented here
  } else {
    console.error("Invalid folderIndex, fileIndex, value, or language");
  }
};



  const zipAndDownload = () => {
    const zip = new JSZip();
    if (folderIndex === -1 && fileIndex === -1) {
      alert("All folders and files are being downloaded!")
      folderfiles.folders.forEach((folder) => {
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
      const folder = folderfiles.folders[folderIndex];
      const folderZip = zip.folder(folder.name);

      folder.files.forEach((file) => {
        folderZip.file(`${file.name}.${file.language}`, file.code);
      });

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, `${folder.name}.zip`);
      });
    } else {
      const folder = folderfiles.folders[folderIndex];
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

  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 h-[96%] ">
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
              folderopen={folderopen}
              setFolderOpen={setFolderOpen}
              updateChangeCode={updateChangeCode}
              zipAndDownload={zipAndDownload}
              handleFileUpload={handleFileUpload}
              shareOpen={shareOpen}
              setShareOpen={setShareOpen}
              infoOpen={infoOpen}
              setInfoOpen={setInfoOpen}
              folderfiles={folderfiles}
              setFolderFiles={setFolderFiles}
              opennewfolder={opennewfolder}
              setOpenNewFolder={setOpenNewFolder}
              folderIndex={folderIndex}
              setFolderIndex={setFolderIndex}
              fileIndex={fileIndex}
              setFileIndex={setFileIndex}
              newFolderName={newFolderName}
              setNewFolderName={setNewFolderName}
              addNewFolder={addNewFolder}
              handleFolderName={handleFolderName}
              extraFileIndex={extraFileIndex}
              setExtraFileIndex={setExtraFileIndex}
              newFileName={newFileName}
              setNewFileName={setNewFileName}
              opennewfile={opennewfile}
              setOpenNewFile={setOpenNewFile}
              openExtraNewFile={openExtraNewFile}
              setOpenExtraNewFile={setOpenExtraNewFile}
              extraNewFileName={extraNewFileName}
              setExtraNewFileName={setExtraNewFileName}
            />
          </div>
          <div className="w-1 bg-gray-300 cursor-ew-resize"></div>
          <div className="flex-1 h-full overflow-y-auto">
            <Output />
          </div>
        </div>
        <div className="bg-gray-100 pl-4">
          <div className={`flex p-4 justify-between `}>
            <label for="testcases" className="font-bold text-xl">
              Test Cases :
            </label>
            <div className="flex items-center gap-4">
              <Run />
              <RunAll />
              <button
                onClick={() => {
                  handleClick();
                }}
              >
                <img
                  src={
                    testcaseOpen === true
                      ? "./Icons/Down.png"
                      : "./Icons/Up.png"
                  }
                  alt="Arrow"
                  className="h-[32px] w-[32px]"
                ></img>
              </button>
            </div>
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
                  <FaTimes size={24} />
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

      {shareOpen === true ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg relative ">
            <button
              onClick={() => {
                setShareOpen(false);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Share this page</h2>
            <input
              type="text"
              value={window.location.href}
              readOnly
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={copyToClipboard}
              className="bg-blue-500 text-white p-2 rounded w-full mb-4"
            >
              Copy URL
            </button>
            <div className="flex justify-around">
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={32} className="text-blue-700" />
              </a>
              <a
                href="https://twitter.com/intent/tweet?url=https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={32} className="text-blue-500" />
              </a>
              <a
                href="https://wa.me/?text=https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={32} className="text-green-500" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {infoOpen === true ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative ">
            <div>
              <button
                onClick={() => {
                  setInfoOpen(false);
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
              <h2 className="text-xl font-bold mb-4">Info</h2>
            </div>

            <div className="flex flex-col p-2 font-semibold">
              <a href="/about">About</a>
              <a href="/about">FAQ</a>
              <a href="/about">Terms and Conditions</a>
              <a href="/about">How to use</a>
              <a href="/about">Contact us</a>
            </div>

            <div className="mb-0 font-bold">
              &copy; iRoots Data and Publishing Company Private Limited
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
