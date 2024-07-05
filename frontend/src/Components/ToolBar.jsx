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
      setSettingsOpen(!settingsopen)
    }
    
    if (e === 3) {
      //Folder
      props.setFolderOpen(!props.folderopen);
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
      props.setShareOpen(!props.shareopen);
      console.log("share opened");
    }

    
  };

  return (
    <div className="flex">
      <div className="border-r-2 border-[#d1d5db] flex flex-col h-full w-14 items-center pr-2 gap-4 pt-2 pb-2 bg-gray-100">
        <div
          className={`${
            selected === 1 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900 `}
          onClick={() => handleSelected(1)}
        >
          <img
            src={"./Icons/SelectFile.png"}
            alt="Select File"
            className="!h-[32px] !w-[32px]"
          />
        </div>
        <div
          className={`${
            selected === 2 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900 `}
          onClick={() => handleSelected(2)}
        >
          <img
            src={"./Icons/Save.png"}
            alt="Save"
            className="!h-[32px] !w-[32px]"
          />
        </div>
        <div
          className={`${
            selected === 3 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900`}
          onClick={() => handleSelected(3)}
        >
          <img
            src={"./Icons/Folder.png"}
            alt="Folder"
            className="!h-[32px] !w-[32px]"
          />
        </div>
        <div
          className={`${
            selected === 4 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900`}
          onClick={() => handleSelected(4)}
        >
          <img
            src={"./Icons/Download.png"}
            alt="Download"
            className="!h-[32px] !w-[32px]"
          />
        </div>
        <div
          className={`${
            selected === 5 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900`}
          onClick={() => handleSelected(5)}
        >
          <img
            src={"./Icons/History.png"}
            alt="History"
            className="!h-[32px] !w-[32px]"
          />
        </div>
        <div
          className={`${
            selected === 6 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900`}
          onClick={() => handleSelected(6)}
        >
          <img
            src={"./Icons/Clipboard.png"}
            alt="Clipboard"
            className="!h-[32px] !w-[32px]"
          />
        </div>
        <div
          className={`flex ${
            selected === 7 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900`}
          onClick={() => handleSelected(7)}
        >
          <img
            src={"./Icons/Settings.png"}
            alt="Settings"
            className="!h-[32px] !w-[32px]"
          />
        </div>
        <div
          className={`${
            selected === 8 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900`}
          onClick={() => handleSelected(8)}
        >
          <img
            src={"./Icons/Share.png"}
            alt="Share"
            className="!h-[32px] !w-[32px]"
          />
        </div>
        <div
          className={`${
            selected === 9 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900`}
          onClick={() => handleSelected(9)}
        >
          <img
            src={"./Icons/Info.png"}
            alt="Info"
            className="!h-[32px] !w-[32px]"
          />
        </div>
        <div
          className={`${
            selected === 10 ? "border-l-4 border-blue-900" : ""
          } cursor-pointer hover:border-l-4 hover:border-blue-900`}
          onClick={() => handleSelected(10)}
        >
          <label>
            <img
              src={"./Icons/Upload.png"}
              alt="Upload"
              className="!h-[32px] !w-[32px] cursor-pointer"
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
      </div>

      <div className="bg-gray-100">
        {settingsopen === true ? (
          <div className="w-44 p-2 ">
            <Settings
              lightmode={props.lightmode}
              setLightMode={props.setLightMode}
              handleLight={props.handleLight}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ToolBar;
