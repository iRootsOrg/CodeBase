import { useState } from "react";

import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import { AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
const Settings = (props) => {
  const [fontSize, setFontSize] = useState(24); // Default font size
  const [wordWrap, setWordWrap] = useState(false);

  const increaseFontSize = () => {
    setFontSize(fontSize + 1);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 1);
  };

  return (
    <div
      className={`w-72 border shadow-sm rounded font-semibold select-none ${
        props.lightmode
          ? " border-black shadow-black bg-gray-100"
          : "border-white shadow-white bg-black"
      }`}
    >
      <div className="text-lg px-2 font-bold">Settings</div>

      <button
        className={`flex gap-2 items-center hover:${
          props.lightmode ? "text-blue-600" : "text-[#00BFFF]"
        } w-full  px-2.5 py-2`}
        onClick={props.formatCode()}
      >
        <img
          className=" mix-blend-multiply !h-[24px] !w-[24px] "
          src={
            props.lightmode
              ? "./Icons/CodeFormatter.png"
              : "./Icons/CodeFormatterLight.png"
          }
          alt="Code Formatter"
        ></img>
        <div>Code Format</div>
      </button>
      <button
        className={`flex gap-2 items-center hover:${
          props.lightmode ? "text-blue-600" : "text-[#00BFFF]"
        } w-full  px-2.5 py-2`}
      >
        <img
          className=" mix-blend-multiply !h-[24px] !w-[24px] "
          src={
            props.lightmode ? "./Icons/Invite.png" : "./Icons/InviteLight.png"
          }
          alt="Invite"
        ></img>
        <div>Invite Others</div>
      </button>
      <div
        className={`flex gap-2 items-center hover:${
          props.lightmode ? "text-blue-600" : "text-[#00BFFF]"
        } w-full  px-2.5 py-2`}
      >
        <img
          className=" mix-blend-multiply !h-[24px] !w-[24px] "
          src={
            props.lightmode
              ? "./Icons/KeyBoardShortcut.png"
              : "./Icons/KeyBoardShortcutLight.png"
          }
          alt="Code Formatter"
        ></img>
        <div>Keyboard Shortcuts</div>
      </div>
      <div
        className={`flex gap-2 items-center hover:${
          props.lightmode ? "text-blue-600" : "text-[#00BFFF]"
        } w-full  px-2.5 py-2`}
      >
        <img
          className=" mix-blend-multiply !h-[24px] !w-[24px] "
          src={
            props.lightmode
              ? "./Icons/FontSize.png"
              : "./Icons/FontSizeLight.png"
          }
          alt="FontSize"
        ></img>
        <div className="mr-4">Font Size</div>
        <button className="px-2 py-1  rounded" onClick={decreaseFontSize}>
          -
        </button>
        <span className="mx-2">{fontSize}px</span>
        <button className="px-2 py-1  rounded" onClick={increaseFontSize}>
          +
        </button>
      </div>
      <div
        className={`flex gap-2 items-center hover:${
          props.lightmode ? "text-blue-600" : "text-[#00BFFF]"
        } w-full  px-2.5 py-2`}
        onClick={() => {
          setWordWrap(!wordWrap);
        }}
      >
        <img
          className=" mix-blend-multiply !h-[24px] !w-[24px] "
          src={
            props.lightmode
              ? "./Icons/WordWrap.png"
              : "./Icons/WordWrapLight.png"
          }
          alt="Word Wrap"
        ></img>
        <div>Word Wrap</div>
        {wordWrap === true ? (
          <div>
            <BiCheckCircle className="text-green-500 h-6 w-6 mr-4" />
          </div>
        ) : (
          <div>
            <BiXCircle className="text-red-500 h-6 w-6 mr-4" />
          </div>
        )}
      </div>
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
