
import { useState } from "react";
const File = (props) => {
    
    const [selectFile, setSelectFile] = useState(-1);
    const openFile = (index) => {
      console.log(index);
      if (selectFile === index) {
        setSelectFile(-1);
      } else {
         setSelectFile(index);
      }
    };

    const deleteFile = (index) => {
      const newFiles = props.files.filter(
        (_, fileIndex) => fileIndex !== index
      );
      props.updateFiles(newFiles); // Use the callback to update the parent state
    }

    return (<div className="w-full">
        {props.files.map((file, index) => {
            return (
                <div
                    className={`w-full text-base  p-1 font-medium  cursor-pointer flex justify-between hover:text-blue-700 ${selectFile === index ? "text-blue-700 shadow-md"
                        :""
                    }`}
                    onClick={()=>{openFile(index)}}
              >
                    <div>🗃️ {file.name}</div>
                    
                    <button className="" onClick={(e) => {
                        e.stopPropagation();//prevents opening automatically
                        deleteFile(index)
                    }}>🗑️</button>
              </div>
            );
        })}
    </div>)
}

export default File;