import Output from "../Components/Output.jsx";
import CodeEditor from "../Components/CodeEditor";
import TestCase from "../Components/TestCase.jsx";
import { useState, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Run from "../Components/Run.jsx";
import RunAll from "../Components/RunAll.jsx";
import { FaFacebook, FaTwitter, FaWhatsapp, FaTimes } from "react-icons/fa";
import { CODE_SNIPPETS, LAN_CONVERSION } from "../Utils/languages.jsx";
import KeyBoardShortcuts from "../Components/KeyBoardShortcuts.jsx";
import light from "react-syntax-highlighter/dist/cjs/light.js";

function EditorPage() {
  const [testcaseOpen, setTestCaseOpen] = useState(false);
  const [testCases, setTestCases] = useState({
    textArea1: "",
    textArea2: "",
    textArea3: "",
    textArea4: "",
  });

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

  //Sample Folders
  const [saveLocally, setSaveLocally] = useState(false);
  const [folderopen, setFolderOpen] = useState(false);
  const initialFolderFiles = {
    folders: [],
    extraFiles: [
      {
        name: "Sample File",
        code: CODE_SNIPPETS["javascript"],
        language: "javascript",
      },
    ],
  };
  const [folderfiles, setFolderFiles] = useState(initialFolderFiles);
  const [language, setLanguage] = useState("javascript");

  const [value, setValue] = useState("");

  useEffect(() => {
    const initialCode = localStorage.getItem("folderfiles");
    // console.log(initialCode);

    if (initialCode === null) {
      localStorage.setItem("folderfiles", JSON.stringify(initialFolderFiles));
      setLanguage(initialFolderFiles.extraFiles[0].language);
      setValue(initialFolderFiles.extraFiles[0].code);
    } else {
      const folderParsing = JSON.parse(initialCode);
      setFolderFiles(folderParsing);

      setLanguage(folderParsing.extraFiles[0].language);
      setValue(folderParsing.extraFiles[0].code);
      setSaveLocally(true);
    }
    setExtraFileIndex(0);
  }, []);

  useEffect(() => {
    if (saveLocally === true) {
      localStorage.setItem("folderfiles", JSON.stringify(folderfiles));
    }
  }, [folderfiles]);

  const [lightmode, setLightMode] = useState(true);

  const handleLight = () => {
    setLightMode(!lightmode);
  };

  const [folderIndex, setFolderIndex] = useState(-1);
  const [fileIndex, setFileIndex] = useState(-1);
  const [extraFileIndex, setExtraFileIndex] = useState(-1);
  const [selectedFiles, setSelectedFiles] = useState(null); //The uploaded files
  const closeMsg = () => {
    setNotify(false);
    setMsg("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
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
    const updateFileCode = (
      folderIndex,
      fileIndex,
      extraFileIndex,
      newCode,
      newLanguage
    ) => {
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

    updateFileCode(folderIndex, fileIndex, extraFileIndex, value, language);

    // Post request sending can be implemented here
  };

  const zipAndDownload = () => {
    const zip = new JSZip();
    if (folderIndex === -1 && fileIndex === -1 && extraFileIndex === -1) {
      alert("All folders and files are being downloaded!");
      folderfiles.folders.forEach((folder) => {
        const folderZip = zip.folder(folder.name);
        folder.files.forEach((file) => {
          folderZip.file(
            `${file.name}.${LAN_CONVERSION[file.language]}`,
            file.code
          );
        });
      });
      folderfiles.extraFiles.forEach((file) => {
        zip.file(`${file.name}.${LAN_CONVERSION[file.language]}`, file.code);
      });

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "files.zip");
      });
    } else if (
      folderIndex >= 0 &&
      folderIndex < folderfiles.folders.length &&
      fileIndex === -1
    ) {
      const folder = folderfiles.folders[folderIndex];
      const folderZip = zip.folder(folder.name);

      folder.files.forEach((file) => {
        folderZip.file(
          `${file.name}.${LAN_CONVERSION[file.language]}`,
          file.code
        );
      });

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, `${folder.name}.zip`);
      });
    } else if (
      extraFileIndex >= 0 &&
      extraFileIndex < folderfiles.extraFiles.length
    ) {
      const file = folderfiles.extraFiles[extraFileIndex];
      const blob = new Blob([file.code], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, `${file.name}.${LAN_CONVERSION[file.language]}`);
    } else if (
      folderIndex >= 0 &&
      folderIndex < folderfiles.folders.length &&
      fileIndex >= 0 &&
      fileIndex < folderfiles.folders[folderIndex].files.length
    ) {
      const folder = folderfiles.folders[folderIndex];
      const file = folder.files[fileIndex];
      const blob = new Blob([file.code], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, `${file.name}.${LAN_CONVERSION[file.language]}`);
    } else {
      alert("No File Selected");
      console.error("Invalid file index");
    }
  };

  const [infoOpen, setInfoOpen] = useState(false);
  const [reportBugOpen, setReportBugOpen] = useState(false);
  const [keyboardShortcut, setKeyboardShortcut] = useState(false);


  return (
    <div className={`flex h-screen ${lightmode ? "bg-white" : "bg-[#1e1e1e]"}`}>
      <div className=" flex flex-col overflow-x-hidden h-full">
        <div className="flex-1 h-full flex overflow-x-hidden">
          <div className="flex-1 h-[87.4%]">
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
              keyboardShortcut={keyboardShortcut}
              setKeyboardShortcut={setKeyboardShortcut}
            />
          </div>
          <div className="w-1 bg-gray-300 cursor-ew-resize"></div>
          <div className="flex-1 h-full overflow-y-auto">
            <Output lightmode={lightmode} />
          </div>
        </div>
        <div className={`${lightmode ? "bg-gray-100" : "bg-[#1e1e1e]"} pl-4 `}>
          <div className={`flex p-4 justify-between h-[10vh]`}>
            <label
              className={`font-bold text-xl ${
                lightmode ? "text-black" : "text-white"
              }`}
            >
              Test Cases :
            </label>
            <div className="flex items-center gap-4">
              <Run lightmode={lightmode} />
              <RunAll lightmode={lightmode} />
              <button
                onClick={() => {
                  handleClick();
                }}
              >
                <img
                  src={
                    testcaseOpen
                      ? lightmode
                        ? "./Icons/Down.png"
                        : "./Icons/DownLight.png"
                      : lightmode
                      ? "./Icons/Up.png"
                      : "./Icons/UpLight.png"
                  }
                  alt="Arrow"
                  className="h-[32px] w-[32px]"
                ></img>
              </button>
            </div>
          </div>
          {testcaseOpen === true ? (
            <TestCase
              testCases={testCases}
              setTestCases={setTestCases}
              lightmode={lightmode}
              reportBugOpen={reportBugOpen}
              setReportBugOpen={setReportBugOpen}
            />
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
        <div
          className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm   `}
        >
          <div
            className={`border ${
              lightmode
                ? "bg-white text-black border-black"
                : "bg-[#1e1e1e] text-white border-white"
            } p-6 rounded-lg shadow-lg relative `}
          >
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
              className={`w-full p-2 border border-gray-300 rounded mb-4 ${
                lightmode ? "bg-white" : "bg-[#1e1e1e]"
              } `}
            />
            <button
              onClick={copyToClipboard}
              className={`${
                lightmode ? "bg-blue-500 text-white" : "bg-[#00BFFF] text-black"
              }  p-2 rounded w-full mb-4`}
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
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
          <div
            className={`border ${
              lightmode
                ? "bg-white text-black  border-black"
                : "bg-[#1e1e1e] text-white border-white"
            } p-6 rounded-lg shadow-lg relative `}
          >
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

      {reportBugOpen === true ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            className={`border ${
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

      {keyboardShortcut === true ? (
        <KeyBoardShortcuts lightmode={lightmode} setLightMode={setLightMode} keyboardShortcut={keyboardShortcut} setKeyboardShortcut={setKeyboardShortcut} />
      ) : (
        ""
      )}
    </div>
  );
}

export default EditorPage;
