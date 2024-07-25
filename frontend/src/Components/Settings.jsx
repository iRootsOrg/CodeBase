import { useState } from "react";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import { AiOutlineSun, AiOutlineMoon } from "react-icons/ai";


const Settings = (props) => {
 
  
  
  const [selected, setSelected] = useState(0);
  const handleInvite = () => {
    props.setInvite(!props.invite);
    setSelected(2);
    props.setSettingsOpen(false);
  };

  const handleFontSizeChange = (e) => {
    props.setFontSize(parseInt(e.target.value, 10));
  };

  

  return (
    <div
      className={`w-60 sm:w-72 text-sm sm:text-base border shadow-sm rounded font-semibold select-none ${
        props.lightmode
          ? " border-black shadow-black bg-gray-100"
          : "border-white shadow-white bg-[#1e1e1e] "
      } `}
    >
      <div className="text-sm sm:text-lg py-2 px-3 font-bold">Settings</div>

      <button
        className={`flex gap-2 items-center hover:${
          props.lightmode ? "text-blue-600" : "text-[#00BFFF]"
        } w-full  px-2.5 py-2`}
        onClick={() => {
          props.formatCode();
        }}
      >
        <img
          className=" mix-blend-multiply !h-[20px] !w-[20px] sm:!h-[24px]  sm:!w-[24px] z-10"
          src={
            props.lightmode
              ? "./Icons/CodeFormatter.png"
              : "./Icons/CodeFormatterLight.png"
          }
          alt="Code Formatter"
        ></img>
        <div>Code Format</div>
      </button>
      <div className="flex">
        <button
          className={`flex gap-2 items-center ${
            props.lightmode
              ? `hover:text-blue-600 ${props.invite ? "text-blue-600" : ""}`
              : `hover:text-[#00BFFF] ${props.invite ? "text-cyan-400" : ""}`
          } w-full  px-2.5 py-2
           ${props.invite ? "text-blue-600" : ""}`}
          onClick={() => {
            handleInvite();
          }}
        >
          <img
            className=" mix-blend-multiply !h-[20px] !w-[20px] sm:!h-[24px]  sm:!w-[24px] "
            src={
              props.lightmode ? "./Icons/Invite.png" : "./Icons/InviteLight.png"
            }
            alt="Invite"
          ></img>
          <div className="flex justify-between w-full pr-4 items-center">
            <div>Invite Others </div>
            {props.showInviteSuccessfull ? (
              props.inviteSuccessfull ? (
                <div>
                  <BiCheckCircle className="text-green-500 h-6 w-6 mr-4" />
                </div>
              ) : (
                <div>
                  <BiXCircle className="text-red-500 h-6 w-6 mr-4" />
                </div>
              )
            ) : (
              ""
            )}
          </div>
        </button>

        
      </div>
      <button
        className={`flex gap-2 items-center hover:${
          props.lightmode ? "text-blue-600" : "text-[#00BFFF]"
        } w-full  px-2.5 py-2`}
        onClick={() => {
          props.setKeyboardShortcut(true);
          props.setSettingsOpen(!props.settingsopen);
          props.setSelected(0);
        }}
      >
        <img
          className=" mix-blend-multiply !h-[20px] !w-[20px] sm:!h-[24px]  sm:!w-[24px] "
          src={
            props.lightmode
              ? "./Icons/KeyBoardShortcut.png"
              : "./Icons/KeyBoardShortcutLight.png"
          }
          alt="Code Formatter"
        ></img>
        <div>Keyboard Shortcuts</div>
      </button>
      <div
        className={`flex gap-2 items-center hover:${
          props.lightmode ? "text-blue-600" : "text-[#00BFFF]"
        } w-full  px-2.5 py-2`}
      >
        <img
          className=" mix-blend-multiply !h-[20px] !w-[20px] sm:!h-[24px]  sm:!w-[24px] "
          src={
            props.lightmode
              ? "./Icons/FontSize.png"
              : "./Icons/FontSizeLight.png"
          }
          alt="FontSize"
        ></img>
        <div className="mr-4">Font Size</div>
        <select
          value={props.fontSize}
          onChange={handleFontSizeChange}
          className={`px-2 py-1 rounded border focus:outline-none ${
            props.lightmode
              ? "text-black bg-white border-black"
              : "text-white bg-[#1e1e1e] border-white"
          }`}
        >
          {[10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30].map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>
      <button
        className={`flex justify-between pr-6 items-center hover:${
          props.lightmode ? "text-blue-600" : "text-[#00BFFF]"
        } w-full  px-2.5 py-2`}
        onClick={() => {
          props.setWordWrap(!props.wordWrap);
          props.setSettingsOpen(!props.settingsopen);
          props.setSelected(0);
        }}
      >
        <div className="flex gap-2 items-center">
          <img
            className=" mix-blend-multiply !h-[20px] !w-[20px] sm:!h-[24px]  sm:!w-[24px] "
            src={
              props.lightmode
                ? "./Icons/WordWrap.png"
                : "./Icons/WordWrapLight.png"
            }
            alt="Word Wrap"
          ></img>
          <div>Word Wrap</div>
        </div>
        {props.wordWrap === true ? (
          <div>
            <BiCheckCircle className="text-green-500 h-6 w-6 mr-4" />
          </div>
        ) : (
          <div>
            <BiXCircle className="text-red-500 h-6 w-6 mr-4" />
          </div>
        )}
      </button>
      <div
        className={`flex gap-2 items-center hover:${
          props.lightmode ? "text-blue-600" : "text-[#00BFFF]"
        } w-full  px-2.5 py-2`}
        onClick={() => {
          props.handleLight();
        }}
      >
        {props.lightmode === true ? (
          <div className="mr-4 flex items-center gap-2">
            <AiOutlineSun className="h-6 w-6" />
            <div>Dark Mode</div>
          </div>
        ) : (
          <div className="mr-4  flex items-center gap-2 ">
            <AiOutlineMoon className="h-6 w-6" />
            <div>Light Mode</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
