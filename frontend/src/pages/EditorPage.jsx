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
import { AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { restrictedPatterns } from "../Utils/restrictedtext.jsx";


const EditorPage = () => {
  

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

  const [shareOpen, setShareOpen] = useState(false);

  const [newFileName, setNewFileName] = useState("");
  const [opennewfile, setOpenNewFile] = useState(false);

  const [openExtraNewFile, setOpenExtraNewFile] = useState(false);
  const [extraNewFileName, setExtraNewFileName] = useState("");

  //Sample Folders
  const [saveLocally, setSaveLocally] = useState(false);
  const [folderopen, setFolderOpen] = useState(false);

  const testCasesSchema = {
    input: [
      {
        content: "",
      },
    ],
    output: [
      {
        error: false,
        erorrCount: 0,
        warning: 0,
        errors: 0,
        content: "Hello JI",
      },
    ],
  };

  const initialOutput = {
    CompilationStatus: "Not Started",
    ExecutionTime: "0.00",
    FilesCompiled: "Still Not Compiled",
    tc: [testCasesSchema],
  };

  const initialFolderFiles = {
    folders: [],
    extraFiles: [
      {
        name: "Sample File",
        code: CODE_SNIPPETS["javascript"],
        language: "javascript",
        output: initialOutput,
      },
    ],
  };

  const [folderfiles, setFolderFiles] = useState(initialFolderFiles);
  const [language, setLanguage] = useState("javascript");

  const [value, setValue] = useState("");
  const [option, setOption] = useState("Output");

  const [outputFile, setOutputFile] = useState(initialOutput);

  useEffect(() => {
    const initialCode = localStorage.getItem("folderfiles");
    // console.log(initialCode);

    if (initialCode === null) {
      localStorage.setItem("folderfiles", JSON.stringify(initialFolderFiles));
      setLanguage(initialFolderFiles.extraFiles[0].language);
      setValue(initialFolderFiles.extraFiles[0].code);
      setOutputFile(initialFolderFiles.extraFiles[0].output);
    } else {
      const folderParsing = JSON.parse(initialCode);
      setFolderFiles(folderParsing);

      setLanguage(folderParsing.extraFiles[0].language);
      setValue(folderParsing.extraFiles[0].code);
      setOutputFile(folderParsing.extraFiles[0].output);
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
    if (lightmode === false) {
      toast("Hello Light!", {
        icon: <AiOutlineSun className="h-6 w-6" />,
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#333",
        },
      });
    } else {
      toast("Hello Darkness!", {
        icon: <AiOutlineMoon className="h-6 w-6" />,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }

    setLightMode(!lightmode);
  };

  const [folderIndex, setFolderIndex] = useState(-1);
  const [fileIndex, setFileIndex] = useState(-1);
  const [extraFileIndex, setExtraFileIndex] = useState(-1);
  const [selectedFiles, setSelectedFiles] = useState(null); //The uploaded files

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("URL copied to clipboard!");
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    console.log(files);

    toast.success("Files Uploaded Successfully");
  };

  const handleClick = () => {
    setTestCaseOpen(!testcaseOpen);
  };

  const handleFolderName = (e) => {
    const name = e.target.value;
    let isValid = true;

    restrictedPatterns.forEach((pattern) => {
      if (pattern.test(name)) {
        isValid = false;
        return; // Exit the forEach loop early
      }
    });

    if (isValid) {
      console.log(name);
      setNewFolderName(name);
    } else {
      console.log("Restricted characters detected");
      toast.error("Your input contains restricted characters", {
        id: "restricted-chars-error-folder",
      });
    }
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

  const updateChangeOutput = (newOutput) => {
    setFolderFiles((prevFolderFiles) => {
      if (folderIndex === -1) {
        // Update extraFiles
        const newExtraFiles = prevFolderFiles.extraFiles.map(
          (file, fiIndex) => {
            if (fiIndex === extraFileIndex) {
              console.log("Updating extra file output :", file.name);
              return {
                ...file,
                output: newOutput,
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
                    "Updating file output in folder:",
                    folder.name,
                    file.name
                  );
                  return {
                    ...file,
                    output: newOutput,
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

    // Post request sending can be implemented here
  };

  const [fileChecked, setFileChecked] = useState(false);
  const [outputChecked, setOutputChecked] = useState(false);

  const formatOutput = (output) => {
    let formattedString =
      "Compilation Status: " + output.CompilationStatus + "\n";
    formattedString += "Execution Time: " + output.ExecutionTime + "\n";
    formattedString += "Files Compiled: " + output.FilesCompiled + "\n\n";

    output.tc.forEach((testCase, index) => {
      formattedString += `Test Case ${index + 1}:\n`;
      testCase.input.forEach((input, iIndex) => {
        formattedString += `  Input ${iIndex + 1}:\n`;
        formattedString += `    Content: ${input.content}\n`;
      });

      testCase.output.forEach((output, oIndex) => {
        formattedString += `  Output ${oIndex + 1}:\n`;
        formattedString += `    Error: ${output.error}\n`;
        formattedString += `    Error Count: ${output.errorCount}\n`;
        formattedString += `    Warning: ${output.warning}\n`;
        formattedString += `    Errors: ${output.errors}\n`;
        formattedString += `    Content: ${output.content}\n`;
      });
      formattedString += "\n";
    });

    return formattedString;
  };

  const zipAndDownload = () => {
    const zip = new JSZip();
    if (folderIndex === -1 && fileIndex === -1 && extraFileIndex === -1) {
      folderfiles.folders.forEach((folder) => {
        const folderZip = zip.folder(folder.name);
        folder.files.forEach((file) => {
          if (fileChecked === true) {
            folderZip.file(
              `${file.name}.${LAN_CONVERSION[file.language]}`,
              file.code
            );
          }

          if (outputChecked === true) {
            const formattedOutput = formatOutput(file.output);
            folderZip.file(`${file.name} Output.txt`, formattedOutput);
          }
        });
      });
      folderfiles.extraFiles.forEach((file) => {
        if (fileChecked === true) {
          zip.file(`${file.name}.${LAN_CONVERSION[file.language]}`, file.code);
        }

        if (outputChecked === true) {
          const formattedOutput = formatOutput(file.output);
          zip.file(`${file.name} Output.txt`, formattedOutput);
        }
      });

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "files.zip");
      });

      toast.success("All folders and files are downloaded!");
    } else if (
      folderIndex >= 0 &&
      folderIndex < folderfiles.folders.length &&
      fileIndex === -1
    ) {
      const folder = folderfiles.folders[folderIndex];
      const folderZip = zip.folder(folder.name);

      folder.files.forEach((file) => {
        if (fileChecked === true) {
          folderZip.file(
            `${file.name}.${LAN_CONVERSION[file.language]}`,
            file.code
          );
        }

        if (outputChecked === true) {
          const formattedOutput = formatOutput(file.output);
          folderZip.file(`${file.name} Output.txt`, formattedOutput);
        }
      });

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, `${folder.name}.zip`);
      });

      toast.success(`${folder.name} is downloaded!`);
    } else if (
      extraFileIndex >= 0 &&
      extraFileIndex < folderfiles.extraFiles.length
    ) {
      const file = folderfiles.extraFiles[extraFileIndex];
      if (fileChecked === true) {
        const blob = new Blob([file.code], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(blob, `${file.name}.${LAN_CONVERSION[file.language]}`);
      }

      if (outputChecked === true) {
        const formattedOutput = formatOutput(file.output);
        const blob = new Blob([formattedOutput], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(blob, `${file.name} Output.txt`);
      }

      toast.success(`${file.name} is downloaded!`);
    } else if (
      folderIndex >= 0 &&
      folderIndex < folderfiles.folders.length &&
      fileIndex >= 0 &&
      fileIndex < folderfiles.folders[folderIndex].files.length
    ) {
      const folder = folderfiles.folders[folderIndex];
      const file = folder.files[fileIndex];
      if (fileChecked === true) {
        const blob = new Blob([file.code], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(blob, `${file.name}.${LAN_CONVERSION[file.language]}`);
      }

      if (outputChecked === true) {
        const formattedOutput = formatOutput(file.output);
        const blob = new Blob([formattedOutput], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(blob, `${file.name} Output.txt`);
      }

      toast.success(`${file.name} is downloaded!`);
    } else {
      toast.error("No folder/file selected");
    }

    setFileChecked(false);
    setOutputChecked(false);
  };

  const [infoOpen, setInfoOpen] = useState(false);
  const [reportBugOpen, setReportBugOpen] = useState(false);
  const [keyboardShortcut, setKeyboardShortcut] = useState(false);
  const [email, setEmail] = useState("");
  const [toolBar, setToolBar] = useState(true);

  return (
    <div
      className={`h-[100%] w-[100%] ${lightmode ? "bg-white" : "bg-[#1e1e1e]"}`}
    >
      <div>
        <Toaster />
      </div>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row w-full h-full">
          <div
            className={`h-[63vh] w-[100vw] sm:h-[100vh] sm:w-[65vw] border-b border-black `}
          >
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
              email={email}
              setEmail={setEmail}
              outputFile={outputFile}
              setOutputFile={setOutputFile}
              initialOutput={initialOutput}
              fileChecked={fileChecked}
              setFileChecked={setFileChecked}
              setOutputChecked={setOutputChecked}
              outputChecked={outputChecked}
              toolBar={toolBar}
              setToolBar={setToolBar}
            />
          </div>
          <div className="sm:w-1 sm:bg-gray-300 sm:cursor-ew-resize"></div>
          <div className="h-auto w-full p-1 border-b border-black sm:h-[100vh] sm:max-md:w-[30vw] md:w-[40vw]">
            <Output
              lightmode={lightmode}
              option={option}
              setOption={setOption}
              outputFile={outputFile}
              setOutputFile={setOutputFile}
            />

          </div>
        </div>
        <div
          className={`${
            lightmode ? "bg-gray-100" : "bg-[#1e1e1e]"
          }  sm:absolute  sm:bottom-0  ${
            toolBar ? "sm:ml-12 sm:w-100-minus-3rem" : "sm:w-[100%]"
          }`}
        >
          <div className={`flex p-4 pt-3 justify-between items-center h-auto`}>
            <label
              className={`font-bold text-xl ${
                lightmode ? "text-black" : "text-white"
              }`}
            >
              Test Cases :
            </label>
            <div className="flex items-center gap-4">
              <Run
                lightmode={lightmode}
                outputFile={outputFile}
                setOutputFile={setOutputFile}
                updateChangeOutput={updateChangeOutput}
              />
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
        </div>
      </div>

      {shareOpen === true ? (
        <div
          className={`fixed px-2 bottom-0  sm:inset-0 w-full flex items-center justify-center backdrop-blur-sm  sm:w-auto `}
        >
          <div
            className={`sm:border border-t-2 ${
              lightmode
                ? "bg-white text-black border-black"
                : "bg-[#1e1e1e] text-white border-white"
            } p-6 rounded-lg shadow-lg relative w-full sm:w-auto`}
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
        <div className="fixed px-2 bottom-0  sm:inset-0 w-full  sm:w-auto flex items-center justify-center backdrop-blur-sm">
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
        <div className="fixed bottom-0 w-full sm:w-auto sm:inset-0 flex sm:items-center sm:justify-center">
          <div
            className={`border ${
              lightmode
                ? "bg-gray-100 bg-opacity-90 text-black border-black"
                : "bg-[#1e1e1e] bg-opacity-90 text-white border-white"
            } p-6 rounded-lg shadow-lg relative w-full sm:w-[70vw]`}
          >
            <div className="flex items-center w-full justify-center">
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
              <h2 className={`text-xl font-bold  `}>Report Bug</h2>
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
        <KeyBoardShortcuts
          lightmode={lightmode}
          setLightMode={setLightMode}
          keyboardShortcut={keyboardShortcut}
          setKeyboardShortcut={setKeyboardShortcut}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default EditorPage;