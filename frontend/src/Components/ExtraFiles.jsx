import { useState } from "react";
import { CODE_SNIPPETS } from "../Utils/languages";
import { FaPlus, FaTrash, FaTimes } from "react-icons/fa";
const ExtraFiles = (props) => {
  const openFile = ({ file, index }) => {
    console.log(index);
    
      
    if (props.extraFileIndex === index) {
      
      props.setExtraFileIndex(-1);
      props.setLanguage("Choose_Language");
      props.setValue(CODE_SNIPPETS["Choose_Language"]);
    } else {
      
      // console.log(file);
      props.setExtraFileIndex(index);
      //Can be merged with selectfile
      props.setValue(file.code);
        props.setLanguage(file.language);
      props.setFolderIndex(-1);
      props.setFileIndex(-1);
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
            key={index}
            className={`w-full text-base  p-1 font-medium  cursor-pointer flex justify-between hover:text-blue-700 ${
              props.extraFileIndex === index ? "text-blue-700 shadow-md" : ""
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
              <FaTrash />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ExtraFiles;
