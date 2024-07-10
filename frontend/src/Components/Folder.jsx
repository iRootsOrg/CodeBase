
import File from "./File";
import { CODE_SNIPPETS } from "../Utils/languages";
import { FaPlus, FaTrash, FaTimes, FaCheck } from "react-icons/fa";
import ExtraFiles from "./ExtraFiles";

const Folder = (props) => {
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
   
    
  };

  const addNewFolder = () => {
    props.setOpenNewFolder(true);
  };

  const handleFileName = (e) => {
    props.setNewFileName(e.target.value);
  };

  const handleExtraFileName = (e) => {
    props.setExtraNewFileName(e.target.value);
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
  };

  return (
    <div
      className={`flex flex-col w-full  gap-1  border-r-4 border-[#d1d5db] ${
        props.lightmode ? "text-black" : "text-white"
      }`}
    >
      <div className="font-bold text-lg p-2 flex justify-between items-center h-10">
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
            className={`w-full text-base gap-2 p-2 font-semibold cursor-pointer hover:bg-white hover:text-blue-600 ${
              props.folderIndex === index ? "shadow-2xl bg-white" : ""
            }`}
          >
            <div
              className={`flex gap-1  items-center ${
                props.folderIndex === index ? "text-blue-600" : ""
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
              <div className="pl-6 w-full">
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
                />

                {props.opennewfile ? (
                  <div className="flex gap-2 hover:text-blue-600 font-medium text-sm p-1 items-center text-black">
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
          <div className="flex gap-2 hover:text-blue-600 font-semibold text-lg p-2 w-full items-center">
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
          />

          {props.openExtraNewFile === true ? (
            <div
              className={`flex gap-2  font-medium text-sm p-1 items-center ${
                props.lightmode ? " hover:text-blue-600" : "hover:text-[#00BFFF]"
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
