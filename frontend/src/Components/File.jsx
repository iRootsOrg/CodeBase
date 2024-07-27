

import {  FaTrash } from "react-icons/fa";
import { CODE_SNIPPETS } from "../Utils/languages";
const File = (props) => {
  const openFile = ({ file, index }) => {
    console.log(file);
      if (props.fileIndex === index) {
     
      props.setFileIndex(-1);
       props.setLanguage("Choose_Language");
       props.setValue(CODE_SNIPPETS["Choose_Language"]);
    } else {
      
      // console.log(file);
      props.setFileIndex(index);
      //Can be merged with selectfile
      props.setValue(file.code);
      props.setLanguage(file.language);
        props.setExtraFileIndex(-1);
        props.setOutputFile(file.output);
    }


  };

  const deleteFile = (index) => {
    const newFiles = props.files.filter((_, fileIndex) => fileIndex !== index);
    props.updateFiles(newFiles); // Use the callback to update the parent state
    props.setFileIndex(-1);
    props.setExtraFileIndex(-1);
    props.setValue("No File Selected");
    props.setOutputFile(props.initialOutput);
  };


  return (
    <div className="w-full">
      {props.files.map((file, index) => {
        return (
          <div
            key={index}
            className={`pl-6 text-black w-full text-xs sm:text-sm  p-1 font-medium  cursor-pointer flex justify-between ${
              props.lightmode
                ? `${
                    (props.folderIndex === props.folderKey &&
                      props.fileIndex === index) === true
                      ? "text-white shadow-md bg-blue-600"
                      : "hover:text-blue-700"
                  }`
                : `${
                    (props.folderIndex === props.folderKey &&
                      props.fileIndex === index) === true
                      ? "text-white shadow-md bg-cyan-600"
                      : "hover:text-cyan-700"
                  }`
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

export default File;