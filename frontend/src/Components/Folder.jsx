import { useState } from "react";
import File from "./File";

const Folder = (props) => {
  const [fileopen, setFileOpen] = useState(-1);
  const [newFileName, setNewFileName] = useState("");
  const [opennewfile, setOpenNewFile] = useState(false);
  
  const openFolder = (index) => {
    console.log(index);
    if (fileopen === index) {
      setFileOpen(-1);
    } else {
      setFileOpen(index);
    }
  };

  const handleNewFolder = (index)=>{
    setFileOpen(index);
    setOpenNewFile(true);
    
  }

  const addNewFolder = () => {
    props.setOpenNewFolder(true);
    console.log("Add new folder");
  }

  const handleFileName = (e) => {
    setNewFileName(e.target.value);
  }

  const addNewFile = (folderIndex) => {
    const newFolders = props.folderfiles.map((folder, index) => {
      if (index === folderIndex) {
        return {
          ...folder,
          files: [
            ...folder.files,
            {
              name: `${newFileName}`,
              code: '',
            },
          ],
        };
      }
      return folder;
    });

    props.setFolderFiles(newFolders);
    setOpenNewFile(false);
    setNewFileName('');
  }

  const updateFiles = (folderIndex, newFiles) => {
    const newFolders = props.folderfiles.map((folder, index) => {
      if (index === folderIndex) {
        return { ...folder, files: newFiles };
      }
      return folder;
    });
    props.setFolderFiles(newFolders);
  };

  const deleteFolder = (folderIndex) => {
    const newFolders = props.folderfiles.filter((_, index) => index !== folderIndex);
    props.setFolderFiles(newFolders);
  }

  

  return (
    <div className="flex flex-col w-full  gap-1  border-r-4 border-[#d1d5db]">
      <div className="font-bold text-xl p-2 flex justify-between">
        <p>Files</p>
        <button onClick={() => { addNewFolder() }}>➕</button>
      </div>
      <div className="w-full flex flex-col">
        {props.folderfiles.map((folder, index) => {
          return (
            <div
              key={index}
              className={`w-full text-lg gap-2 p-2 font-semibold cursor-pointer hover:bg-white ${
                fileopen === index ? "shadow-2xl bg-white" : ""
              }`}
            >
              <div
                className={`flex gap-1 hover:text-blue-600 items-center ${
                  fileopen === index ? "text-blue-600  " : ""
                }`}
              >
                {fileopen === index ? "📂 " : "📁 "}

                <div className="flex justify-between  w-full">
                  <div onClick={() => openFolder(index)}>{folder.name}</div>
                  <div className="flex">
                  <button
                    onClick={() => {
                      handleNewFolder(index);
                    }}
                  >
                    ➕
                  </button>

                  <button
                    onClick={() => {
                      deleteFolder(index);
                    }}
                  >
                    🗑️
                  </button>
                  </div>
                </div>
              </div>

              {fileopen === index ? (
                <div className="pl-6 w-full">
                  <File
                    key={fileopen}
                    files={props.folderfiles[fileopen].files}
                    updateFiles={(newFiles) => updateFiles(index, newFiles)}
                  />

                  {opennewfile === true ? (
                    <div className="flex gap-2 hover:text-blue-600 font-medium text-base p-1 items-center">
                      <div>🗃️</div>
                      <input
                        value={newFileName}
                        onChange={(e) => {
                          handleFileName(e);
                        }}
                        className="w-[50px] focus:outline-none"
                      ></input>

                      <button
                        onClick={() => {
                          addNewFile(index);
                        }}
                        className=""
                      >
                        ✔️
                      </button>

                      <button
                        onClick={() => {
                          setOpenNewFile(false);
                          setNewFileName("");
                        }}
                        className=""
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Folder;
