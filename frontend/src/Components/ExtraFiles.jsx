import { useState } from "react";
const ExtraFiles = (props) => {
  const openFile = ({ file, index }) => {
      console.log(index);
      
    if (props.selectFile === index) {
      props.setSelectFile(-1);
      props.setFileIndex(-1);
      props.setValue("No File Selected");
      props.setLanguage("");
    } else {
      props.setSelectFile(index);
      // console.log(file);
      props.setFileIndex(index);
      //Can be merged with selectfile
      props.setValue(file.code);
        props.setLanguage(file.language);
        props.setFolderIndex(props.folderIndex);
    }
  };

  const deleteFile = (index) => {
    const newFiles = props.files.filter((_, fileIndex) => fileIndex !== index);
    props.updateFiles(newFiles); // Use the callback to update the parent state
  };

  return (
    <div className="w-full">
      {props.files.map((file, index) => {
        return (
          <div
            className={`w-full text-base  p-1 font-medium  cursor-pointer flex justify-between hover:text-blue-700 ${
              (props.selectFile === index && props.folderIndex === -1) === true
                ? "text-blue-700 shadow-md"
                : ""
            }`}
            onClick={() => {
              openFile({ file, index });
            }}
          >
            <div>🗃️ {file.name}</div>

            <button
              className=""
              onClick={(e) => {
                e.stopPropagation(); //prevents opening automatically
                deleteFile(index);
              }}
            >
              🗑️
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ExtraFiles;
