import React, { useRef } from "react";
import { FaPlus, FaTrash, FaTimes, FaCheck } from "react-icons/fa";
import File from "./File";
import ExtraFiles from "./ExtraFiles";
import { CODE_SNIPPETS } from "../Utils/languages";
import { restrictedPatterns } from "../Utils/restrictedtext";
import toast from "react-hot-toast";

const Folder = (props) => {
  const lastInvalidFileNameRef = useRef("");
  const lastInvalidExtraFileNameRef = useRef("");

  const openFolder = (index) => {
    props.setLanguage("Choose_Language");
    props.setValue(CODE_SNIPPETS["Choose_Language"]);
    if (props.folderIndex === index) {
      props.setFolderIndex(-1);
      props.setFileIndex(-1);
    } else {
      props.setFolderIndex(index);
      props.setExtraFileIndex(-1);
      props.setFileIndex(-1);
    }
  };

  const handleNewFolder = (index) => {
    props.setLanguage("Choose_Language");
    props.setValue(CODE_SNIPPETS["Choose_Language"]);
    let lastFileIndex = props.folderfiles.folders[index].files.length - 1;
    lastFileIndex = lastFileIndex >= 0 ? lastFileIndex : 0;
    props.setFileIndex(lastFileIndex);
    props.setFolderIndex(index);
    props.setOpenNewFile(true);
    props.setOutputFile(props.initialOutput);
  };

  const addNewFolder = () => {
    props.setOpenNewFolder(true);
  };

  const handleFileName = (e) => {
    const name = e.target.value;
    let isValid = true;

    restrictedPatterns.forEach((pattern) => {
      if (pattern.test(name)) {
        isValid = false;
        return; // Exit the forEach loop early
      }
    });

    if (isValid) {
      props.setNewFileName(e.target.value);
      lastInvalidFileNameRef.current = ""; // Reset the last invalid input
    } else {
      if (lastInvalidFileNameRef.current !== name) {
        lastInvalidFileNameRef.current = name;
        console.log("Restricted characters detected");
        toast.error("Your input contains restricted characters", {
          id: "restricted-chars-error",
        });
      }
    }
  };

  const handleExtraFileName = (e) => {
    const name = e.target.value;
    let isValid = true;

    restrictedPatterns.forEach((pattern) => {
      if (pattern.test(name)) {
        isValid = false;
        return; // Exit the forEach loop early
      }
    });

    if (isValid) {
      props.setExtraNewFileName(e.target.value);
      lastInvalidExtraFileNameRef.current = ""; // Reset the last invalid input
    } else {
      if (lastInvalidExtraFileNameRef.current !== name) {
        lastInvalidExtraFileNameRef.current = name;
        console.log("Restricted characters detected");
        toast.error("Your input contains restricted characters", {
          id: "restricted-chars-error-extra",
        });
      }
    }
  };

  const addNewFile = (folderIndex) => {
    const newFolders = props.folderfiles.folders.map((folder, index) => {
      if (index === folderIndex) {
        return {
          ...folder,
          files: [
            ...folder.files,
            {
              name: props.newFileName,
              code: CODE_SNIPPETS[props.language],
              language: props.language,
              output: props.outputFile,
            },
          ],
        };
      }
      return folder;
    });

    props.setFolderFiles({ ...props.folderfiles, folders: newFolders });
    props.setFileIndex(newFolders[folderIndex].files.length - 1);
    props.setOpenNewFile(false);
    props.setNewFileName("");
  };

  const addNewExtraFile = () => {
    const newExtraFile = {
      name: props.extraNewFileName,
      code: CODE_SNIPPETS[props.language],
      language: props.language,
      output: props.outputFile,
    };

    const newExtraFiles = [...props.folderfiles.extraFiles, newExtraFile];

    props.setFolderFiles((prevState) => ({
      ...prevState,
      extraFiles: newExtraFiles,
    }));

    props.setExtraFileIndex(newExtraFiles.length - 1);
    props.setOpenExtraNewFile(false);
    props.setExtraNewFileName("");
  };

  const updateFiles = (folderIndex, newFiles) => {
    const newFolders = props.folderfiles.folders.map((folder, index) => {
      if (index === folderIndex) {
        return { ...folder, files: newFiles };
      }
      return folder;
    });

    props.setFolderFiles((prevState) => ({
      ...prevState,
      folders: newFolders,
    }));
  };

  const deleteFolder = (folderIndex) => {
    const newFolders = props.folderfiles.folders.filter(
      (_, index) => index !== folderIndex
    );

    props.setFolderFiles((prevState) => ({
      ...prevState,
      folders: newFolders,
    }));

    props.setFolderIndex(-1);
    props.setFileIndex(-1);
    props.setExtraFileIndex(-1);
    props.setValue("No File Selected");
    props.setOutputFile(props.initialOutput);
  };

  const setAllNull = () => {
    props.setOpenNewFile(false);
    props.setOpenNewFolder(false);
    props.setNewFileName("");
    props.setFolderIndex(-1);
    props.setFileIndex(-1);
    props.setExtraFileIndex(-1);
    props.setLanguage("Choose_Language");
    props.setValue(CODE_SNIPPETS["Choose_Language"]);
    props.setOutputFile(props.initialOutput);
  };

  return (
    <div
      className={`flex flex-col w-full h-full  gap-1  border-r-4 border-[#d1d5db] ${
        props.lightmode ? "text-black" : "text-white"
      }`}
    >
      <div className="font-bold text-base sm:text-lg p-2 flex justify-between items-center h-10">
        <div className="h-full">Files</div>
        <div className="flex gap-1 items-center h-full">
          <button onClick={addNewFolder}>
            <FaPlus />
          </button>
          <button onClick={setAllNull}>
            <FaTimes />
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col">
        {props.folderfiles.folders.map((folder, index) => (
          <div
            key={index}
            className={`w-full text-sm sm:text-base gap-2 p-2 font-semibold cursor-pointer ${
              props.lightmode
                ? `hover:text-white  ${
                    props.folderIndex === index
                      ? "shadow-2xl bg-white !hover:bg-white"
                      : "hover:bg-blue-600"
                  }`
                : `hover:text-white  ${
                    props.folderIndex === index
                      ? "shadow-2xl bg-white !hover:bg-white"
                      : "hover:bg-cyan-600"
                  }`
            }`}
          >
            <div
              className={`flex gap-1  items-center ${
                props.lightmode
                  ? `${props.folderIndex === index ? "text-blue-600" : ""}`
                  : `${props.folderIndex === index ? "text-cyan-600" : ""}`
              }`}
            >
              {props.folderIndex === index ? "📂 " : "📁 "}
              <div className="flex justify-between w-full select-none">
                <div onClick={() => openFolder(index)}>{folder.name}</div>
                <div className="flex gap-2">
                  <button onClick={() => handleNewFolder(index)}>
                    <FaPlus />
                  </button>
                  <button onClick={() => deleteFolder(index)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>

            {props.folderIndex === index ? (
              <div className="w-full">
                <File
                  folderKey={index}
                  files={props.folderfiles.folders[props.folderIndex].files}
                  updateFiles={(newFiles) => updateFiles(index, newFiles)}
                  value={props.value}
                  setValue={props.setValue}
                  fileIndex={props.fileIndex}
                  setFileIndex={props.setFileIndex}
                  language={props.language}
                  setLanguage={props.setLanguage}
                  folderIndex={props.folderIndex}
                  setFolderIndex={props.setFolderIndex}
                  extraFileIndex={props.extraFileIndex}
                  setExtraFileIndex={props.setExtraFileIndex}
                  lightmode={props.lightmode}
                  outputFile={props.outputFile}
                  setOutputFile={props.setOutputFile}
                  initialOutput={props.initialOutput}
                />

                {props.opennewfile ? (
                  <div className="flex gap-2 hover:text-blue-600 font-medium text-xs sm:text-sm p-1 items-center text-black">
                    <div>🗃️</div>
                    <input
                      value={props.newFileName}
                      onChange={handleFileName}
                      className="w-16 focus:outline-none"
                    />
                    <div className="flex gap-2 justify-end items-center w-full">
                      <button onClick={() => addNewFile(index)}>
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => {
                          props.setOpenNewFile(false);
                          props.setNewFileName("");
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        ))}

        {props.opennewfolder === true ? (
          <div className="flex gap-2 hover:text-blue-600 font-semibold text-base sm:text-lg p-2 w-full items-center">
            <div>📁</div>
            <input
              value={props.newFolderName}
              onChange={(e) => {
                props.handleFolderName(e);
              }}
              className="w-20 focus:outline-none"
            ></input>
            <div className="flex justify-around items-center w-full">
              <button
                onClick={() => {
                  props.addNewFolder();
                }}
              >
                <FaCheck />
              </button>
              <button
                onClick={() => {
                  props.setOpenNewFolder(false);
                  props.setNewFolderName("");
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="w-full flex flex-col p-2">
        <div className="w-full">
          <ExtraFiles
            key={-1}
            files={props.folderfiles.extraFiles}
            updateFiles={(newFiles) => {
              const updatedFolderFiles = {
                ...props.folderfiles,
                extraFiles: newFiles,
              };
              props.setFolderFiles(updatedFolderFiles);
            }}
            value={props.value}
            setValue={props.setValue}
            fileIndex={props.fileIndex}
            setFileIndex={props.setFileIndex}
            extraFileIndex={props.extraFileIndex}
            setExtraFileIndex={props.setExtraFileIndex}
            language={props.language}
            setLanguage={props.setLanguage}
            folderIndex={props.folderIndex}
            setFolderIndex={props.setFolderIndex}
            lightmode={props.lightmode}
            outputFile={props.outputFile}
            setOutputFile={props.setOutputFile}
            initialOutput={props.initialOutput}
          />

          {props.openExtraNewFile === true ? (
            <div
              className={`flex gap-2  font-medium text-xs sm:text-sm p-1 items-center ${
                props.lightmode
                  ? " hover:text-blue-600"
                  : "hover:text-[#00BFFF]"
              }`}
            >
              <div>🗃️</div>
              <input
                value={props.newExtraFileName}
                onChange={handleExtraFileName}
                className="w-24 focus:outline-none"
              />
              <div className="flex gap-2 justify-end items-center w-full">
                <button onClick={() => addNewExtraFile()}>
                  <FaCheck />
                </button>
                <button
                  onClick={() => {
                    props.setOpenExtraNewFile(false);
                    props.setExtraNewFileName("");
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Folder;
