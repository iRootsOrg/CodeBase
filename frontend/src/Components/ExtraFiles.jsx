
import { CODE_SNIPPETS } from "../Utils/languages";
import { FaTrash } from "react-icons/fa";
const ExtraFiles = (props) => {
  const openFile = ({ file, index }) => {
    console.log(index);
    
      
    if (props.extraFileIndex === index) {
      
      props.setExtraFileIndex(-1);
      props.setLanguage("Choose_Language");
      props.setValue(CODE_SNIPPETS["Choose_Language"]);
      props.setOutputFile(props.initialOutput);
    } else {
      
      // console.log(file);
      props.setExtraFileIndex(index);
      //Can be merged with selectfile
      props.setValue(file.code);
        props.setLanguage(file.language);
      props.setFolderIndex(-1);
      props.setFileIndex(-1);
      props.setOutputFile(file.output);
    }
  };

  const deleteFile = (index) => {
    const newFiles = props.files.filter((_, fileIndex) => fileIndex !== index);
    props.updateFiles(newFiles); 
    props.setExtraFileIndex(-1);
    props.setFolderIndex(-1);
    props.setFileIndex(-1);
    props.setValue("No File Selected");
    props.setOutputFile(props.initialOutput);
  };

  return (
    <div className="w-full">
      {props.files.map((file, index) => {
        return (
          <div
            key={index}
            className={`w-full text-xs sm:text-base  p-1 font-medium  cursor-pointer flex justify-between 
              ${
                props.lightmode
                  ? `${
                      props.extraFileIndex === index
                        ? `text-white bg-blue-600
                               shadow-md `
                        : "hover:text-blue-700"
                    }`
                  : `${
                      props.extraFileIndex === index
                        ? `text-white bg-cyan-600
                               shadow-md `
                        : "hover:text-cyan-200"
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

export default ExtraFiles;
