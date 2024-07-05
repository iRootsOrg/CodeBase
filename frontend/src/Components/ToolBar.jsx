import { useState } from "react";
import Settings from "./Settings.jsx";
const ToolBar = (props) => {
  const [selected, setSelected] = useState(0);
   const [settingsopen, setSettingsOpen] = useState(false);

  const handleSelected = (e) => {

    // console.log(props.value);
    if (selected === e) {
      setSelected(0);
    } else {
      setSelected(e);
    }

    if (e === 6) {
      // console.log(props.value);
      navigator.clipboard.writeText(props.value).then(() => {
        // console.log(props.value);
        setSelected(0);
        alert("Code successfully copied to Clipboard!");
      }).catch((err) => {
        console.error("Error in copying ", err);
      });
      
    }

    if (e === 7) {
      setSettingsOpen(!settingsopen);
      
    }
    
    if (e === 3 || e === 1) {
      //Folder
      props.setFolderOpen(!props.folderopen);
      // if (e === 1) {
      //   InvokeFile
      // }
    }

    if (e === 2) {
      //Save functionality
      props.updateChangeCode();
      setSelected(0);
    }

    if (e === 4) {
      props.zipAndDownload();
      setSelected(0);
    }

    if (e === 8) {
      props.setShareOpen(!props.shareOpen);
      console.log("share opened");
      setSelected(0);
    }

    if (e === 9) {
      props.setInfoOpen(!props.infoOpen);
      console.log("info opened");
      setSelected(0);
    }

    
  };

  return (
    
    <div className="flex p-0">
      {props.toolBar === true ? 
      (<div className="border-r-2 border-[#d1d5db] flex flex-col items-center w-12 gap-3 bg-gray-100">
        

        <div
          className={`ml-1 h-8 flex justify-center items-center  w-full pt-2 ${
            selected === 1 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900  `}
          onClick={() => handleSelected(1)}
        >
          <img
            src={"./Icons/SelectFile.png"}
            alt="Select File"
            className="!h-[24px] !w-[24px]"
          />
        </div>
        <div
          className={`     ml-1 h-8 flex justify-center items-center w-full ${
            selected === 2 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900 `}
          onClick={() => handleSelected(2)}
        >
          <img
            src={"./Icons/Save.png"}
            alt="Save"
            className="!h-[24px] !w-[24px]"
          />
        </div>
        <div
          className={`      ml-1 h-8 flex justify-center items-center w-full ${
            selected === 3 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900`}
          onClick={() => handleSelected(3)}
        >
          <img
            src={"./Icons/Folder.png"}
            alt="Folder"
            className="!h-[24px] !w-[24px]"
          />
        </div>
        <div
          className={`      ml-1 h-8 flex justify-center items-center w-full ${
            selected === 4 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900`}
          onClick={() => handleSelected(4)}
        >
          <img
            src={"./Icons/Download.png"}
            alt="Download"
            className="!h-[24px] !w-[24px]"
          />
        </div>
        <div
          className={`     ml-1 h-8 flex justify-center items-center w-full ${
            selected === 5 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900`}
          onClick={() => handleSelected(5)}
        >
          <img
            src={"./Icons/History.png"}
            alt="History"
            className="!h-[24px] !w-[24px]"
          />
        </div>
        <div
          className={`      ml-1 h-8 flex justify-center items-center w-full ${
            selected === 6 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900`}
          onClick={() => handleSelected(6)}
        >
          <img
            src={"./Icons/Clipboard.png"}
            alt="Clipboard"
            className="!h-[24px] !w-[24px]"
          />
        </div>

        <div
          className={`     ml-1 h-8 flex justify-center items-center w-full  ${
            selected === 7 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900`}
        >
          <img
            onClick={() => handleSelected(7)}
            src={"./Icons/Settings.png"}
            alt="Settings"
            className="!h-[24px] !w-[24px]"
          />

          {settingsopen === true ? (
            <div
              className={`absolute left-14  py-2 z-10 rounded ${
                props.lightmode === true
                  ? "bg-gray-100 text-black"
                  : "bg-black text-gray-100"
              }`}
            >
              <Settings
                lightmode={props.lightmode}
                setLightMode={props.setLightMode}
                handleLight={props.handleLight}
                formatCode={props.formatCode}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          className={`     ml-1 h-8 flex justify-center items-center w-full ${
            selected === 8 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900`}
          onClick={() => handleSelected(8)}
        >
          <img
            src={"./Icons/Share.png"}
            alt="Share"
            className="!h-[24px] !w-[24px]"
          />
        </div>
        <div
          className={`     ml-1 h-8 flex justify-center items-center w-full ${
            selected === 9 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900`}
          onClick={() => handleSelected(9)}
        >
          <img
            src={"./Icons/Info.png"}
            alt="Info"
            className="!h-[24px] !w-[24px]"
          />
        </div>
        <div
          className={`     ml-1 h-8 flex justify-center items-center w-full ${
            selected === 10 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900`}
          onClick={() => handleSelected(10)}
        >
          <label>
            <img
              src={"./Icons/Upload.png"}
              alt="Upload"
              className="!h-[24px] !w-[24px] cursor-pointer"
            />
            <input
              type="file"
              multiple
              webkitdirectory="true"
              onChange={props.handleFileUpload}
              className="hidden"
              name="upload"
            />
          </label>
        </div>
        <div
          className={`     ml-1 h-8 flex justify-center items-center w-full ${
            selected === 11 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900`}
          onClick={() => handleSelected(11)}
        >
          <img
            src={"./Icons/More.png"}
            alt="Info"
            className="!h-[24px] !w-[24px]"
          />
        </div>
      </div>):""}
    </div>
  );
};

export default ToolBar;
