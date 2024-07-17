import Settings from "./Settings.jsx";
import { CODE_SNIPPETS } from "../Utils/languages.jsx";
import ToolTip from "./ToolTip.jsx";

const ToolBar = (props) => {
  const handleSelected = (e) => {
    if (props.selected === e) {
      props.setSelected(0);
    } else {
      props.setSelected(e);
    }

    switch (e) {
      case 1:
        props.setFolderOpen(true);
        props.setSelected(3);
        if (props.folderIndex !== -1) {
          // console.log("For folderindex ", props.folderIndex);
          let lastFileIndex =
            props.folderfiles.folders[props.folderIndex].files.length - 1;
          lastFileIndex = lastFileIndex >= 0 ? lastFileIndex : 0;
          props.setFileIndex(lastFileIndex);
          props.setOpenNewFile(true);
        } else {
          // console.log("extra file");
          props.setOpenExtraNewFile(true);

          let lastExtraFileIndex = props.folderfiles.extraFiles.length - 1;
          lastExtraFileIndex = lastExtraFileIndex >= 0 ? lastExtraFileIndex : 0;
          props.setExtraFileIndex(lastExtraFileIndex);
        }

        props.setLanguage("Choose_Language");
        props.setValue(CODE_SNIPPETS["Choose_Language"]);

        break;

      case 2:
        props.updateChangeCode();
        props.setSelected(0);
        break;

      case 3:
        props.setFolderOpen(!props.folderopen);
        // props.setFolderIndex(-1);
        // props.setFileIndex(-1);
        break;

      case 4:
        props.zipAndDownload();
        props.setSelected(0);
        break;
      case 5:
        props.setHistoryOpen(!props.historyOpen);
        break;
      case 6:
        navigator.clipboard
          .writeText(props.value)
          .then(() => {
            props.setSelected(0);
            alert("Code successfully copied to Clipboard!");
          })
          .catch((err) => {
            console.error("Error in copying ", err);
          });
        break;

      case 7:
        props.setSettingsOpen(!props.settingsopen);
        break;

      case 8:
        props.setShareOpen(!props.shareOpen);
        console.log("share opened");
        props.setSelected(0);
        break;

      case 9:
        props.setInfoOpen(!props.infoOpen);
        console.log("info opened");
        props.setSelected(0);
        break;

      default:
        props.setSelected(0);
        break;
    }
  };

  return (
    <div className="flex p-0 h-full bg-gray-100">
      {props.toolBar === true ? (
<<<<<<< HEAD
        
        <div className="border-r-2 border-[#d1d5db] flex flex-col items-center w-12 gap-3 bg-gray-100">
          <ToolTip text="Select File">
          <div
            className={`ml-1 h-8 flex justify-center items-center  w-full pt-2 ${
              props.selected === 1 ? "border-l-4 border-blue-900" : ""
            } cursor-pointer hover:border-l-4 hover:border-blue-900  `}
            onClick={() => handleSelected(1)}
          >
            <img
              src={"./Icons/SelectFile.png"}
              alt="Select File"
              className="!h-[24px] !w-[24px]"
            />
          </div> 
          </ToolTip>
          <ToolTip text="Save">
          <div
            className={`     ml-1 h-8 flex justify-center items-center w-full ${
              props.selected === 2 ? "border-l-4 border-blue-900" : ""
            } cursor-pointer hover:border-l-4 hover:border-blue-900 `}
            onClick={() => handleSelected(2)}
          >
            <img
              src={"./Icons/Save.png"}
              alt="Save"
              className="!h-[24px] !w-[24px]"
            />
          </div>
          </ToolTip>
          <ToolTip text="Folders">
          <div
            className={`      ml-1 h-8 flex justify-center items-center w-full ${
              props.selected === 3 ? "border-l-4 border-blue-900" : ""
            } cursor-pointer hover:border-l-4 hover:border-blue-900`}
            onClick={() => handleSelected(3)}
          >
            <img
              src={"./Icons/Folder.png"}
              alt="Folder"
              className="!h-[24px] !w-[24px]"
            />
          </div>
          </ToolTip>
          <ToolTip text="Download">
          <div
            className={`      ml-1 h-8 flex justify-center items-center w-full ${
              props.selected === 4 ? "border-l-4 border-blue-900" : ""
            } cursor-pointer hover:border-l-4 hover:border-blue-900`}
            onClick={() => handleSelected(4)}
          >
            <img
              src={"./Icons/Download.png"}
              alt="Download"
              className="!h-[24px] !w-[24px]"
            />
          </div>
          </ToolTip>
          <ToolTip text="History">
          <div
            className={`     ml-1 h-8 flex justify-center items-center w-full ${
              props.selected === 5 ? "border-l-4 border-blue-900" : ""
            } cursor-pointer hover:border-l-4 hover:border-blue-900`}
            onClick={() => handleSelected(5)}
          >
            <img
              src={"./Icons/History.png"}
              alt="History"
              className="!h-[24px] !w-[24px]"
            />
          </div>
          </ToolTip>
          <ToolTip text="Copy to Clipboard">
          <div
            className={`      ml-1 h-8 flex justify-center items-center w-full ${
              props.selected === 6 ? "border-l-4 border-blue-900" : ""
            } cursor-pointer hover:border-l-4 hover:border-blue-900`}
            onClick={() => handleSelected(6)}
          >
            <img
              src={"./Icons/Clipboard.png"}
              alt="Clipboard"
              className="!h-[24px] !w-[24px]"
            />
           
          </div>
          </ToolTip>
            <ToolTip text="Settings">
          <div
            className={`     ml-1 h-8 flex justify-center items-center w-full  ${
              props.selected === 7 ? "border-l-4 border-blue-900" : ""
            } cursor-pointer hover:border-l-4 hover:border-blue-900`}
          >
            <img
              onClick={() => handleSelected(7)}
              src={"./Icons/Settings.png"}
              alt="Settings"
              className="!h-[24px] !w-[24px]"
            />

            {props.settingsopen === true ? (
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
          </ToolTip>
          <ToolTip text="Share">
          <div
            className={`     ml-1 h-8 flex justify-center items-center w-full ${
              props.selected === 8 ? "border-l-4 border-blue-900" : ""
            } cursor-pointer hover:border-l-4 hover:border-blue-900`}
            onClick={() => handleSelected(8)}
          >
            <img
              src={"./Icons/Share.png"}
              alt="Share"
              className="!h-[24px] !w-[24px]"
            />
          </div>
          </ToolTip>
          <ToolTip text="More Info">
          <div
            className={`     ml-1 h-8 flex justify-center items-center w-full ${
              props.selected === 9 ? "border-l-4 border-blue-900" : ""
            } cursor-pointer hover:border-l-4 hover:border-blue-900`}
            onClick={() => handleSelected(9)}
          >
            <img
              src={"./Icons/Info.png"}
              alt="Info"
              className="!h-[24px] !w-[24px]"
            />
          </div>
          </ToolTip>
          <ToolTip text="Upload Code">
          <div
            className={`     ml-1 h-8 flex justify-center items-center w-full ${
              props.selected === 10 ? "border-l-4 border-blue-900" : ""
            } cursor-pointer hover:border-l-4 hover:border-blue-900`}
            onClick={() => handleSelected(10)}
          >
            <label>
=======
        <div
          className={`border-r-2 border-[#d1d5db] flex flex-col items-center  justify-between gap-3 w-12  ${
            props.lightmode ? "bg-gray-100" : "bg-[#1e1e1e]"
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className={`ml-1  h-auto py-1 flex justify-center items-center  w-full pt-2 ${
                props.selected === 1
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(1)}
            >
>>>>>>> 8b24744dad48e2f4dd09fcecaaaeeda5308d2d7a
              <img
                src={"./Icons/SelectFile.png"}
                alt="Select File"
                className="!h-[24px] !w-[24px]"
              />
            </div>
            <div
              className={`ml-1  h-auto py-1 flex justify-center items-center w-full ${
                props.selected === 2
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(2)}
            >
              <img
                src={"./Icons/Save.png"}
                alt="Save"
                className="!h-[24px] !w-[24px]"
              />
            </div>
            <div
              className={`ml-1  h-auto py-1 flex justify-center items-center w-full ${
                props.selected === 3
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(3)}
            >
              <img
                src={"./Icons/Folder.png"}
                alt="Folder"
                className="!h-[24px] !w-[24px]"
              />
            </div>
            <div
              className={`      ml-1  h-auto py-1 flex justify-center items-center w-full ${
                props.selected === 4
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(4)}
            >
              <img
                src={"./Icons/Download.png"}
                alt="Download"
                className="!h-[24px] !w-[24px]"
              />
            </div>
            <div
              className={`     ml-1  h-auto py-1 flex justify-center items-center w-full ${
                props.selected === 5
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(5)}
            >
              <img
                src={"./Icons/History.png"}
                alt="History"
                className="!h-[24px] !w-[24px]"
              />
            </div>
            <div
              className={`      ml-1  h-auto py-1 flex justify-center items-center w-full ${
                props.selected === 6
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(6)}
            >
              <img
                src={"./Icons/Clipboard.png"}
                alt="Clipboard"
                className="!h-[24px] !w-[24px]"
              />
            </div>
            <div
              className={`     ml-1  h-auto py-1 flex justify-center items-center w-full ${
                props.selected === 8
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(8)}
            >
              <img
                src={"./Icons/Share.png"}
                alt="Share"
                className="!h-[24px] !w-[24px]"
              />
            </div>
            <div
              className={`     ml-1  h-auto py-1 flex justify-center items-center w-full ${
                props.selected === 9
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(9)}
            >
              <img
                src={"./Icons/Info.png"}
                alt="Info"
                className="!h-[24px] !w-[24px]"
              />
            </div>
            <div
              className={`     ml-1  h-auto py-1 flex justify-center items-center w-full ${
                props.selected === 10
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
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
          </div>
<<<<<<< HEAD
          </ToolTip>
          <ToolTip text="">
          <div
            className={`     ml-1 h-8 flex justify-center items-center w-full ${
              props.selected === 11 ? "border-l-4 border-blue-900" : ""
            } cursor-pointer hover:border-l-4 hover:border-blue-900`}
            onClick={() => handleSelected(11)}
          >
            <img
              src={"./Icons/More.png"}
              alt="Info"
              className="!h-[24px] !w-[24px]"
            />
=======
          <div className="flex flex-col items-center gap-3">
            <div
              className={`     ml-1  h-auto py-1 flex justify-center items-center w-full  ${
                props.selected === 7
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
            >
              <img
                onClick={() => handleSelected(7)}
                src={"./Icons/Settings.png"}
                alt="Settings"
                className="!h-[24px] !w-[24px]"
              />

              {props.settingsopen === true ? (
                <div
                  className={`absolute left-14 bottom-16 py-2 z-10 rounded bg-transparent ${
                    props.lightmode === true ? " text-black" : "text-white"
                  }`}
                >
                  <Settings
                    lightmode={props.lightmode}
                    setLightMode={props.setLightMode}
                    handleLight={props.handleLight}
                    formatCode={props.formatCode}
                    wordWrap={props.wordWrap}
                    setWordWrap={props.setWordWrap}
                    settingsopen={props.settingsopen}
                    setSettingsOpen={props.setSettingsOpen}
                    setSelected={props.setSelected}
                    keyboardShortcut={props.keyboardShortcut}
                    setKeyboardShortcut={props.setKeyboardShortcut}
                    fontSize={props.fontSize}
                    setFontSize={props.setFontSize}
                    email={props.email}
                    setEmail={props.setEmail}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              className={`     ml-1  h-auto py-1 flex justify-center items-center w-full ${
                props.selected === 11
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(11)}
            >
              <img
                src={"./Icons/More.png"}
                alt="Info"
                className="!h-[24px] !w-[24px]"
              />
            </div>
>>>>>>> 8b24744dad48e2f4dd09fcecaaaeeda5308d2d7a
          </div>
          </ToolTip>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ToolBar;
