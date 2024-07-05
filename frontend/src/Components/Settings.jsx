import { useState } from "react";
import { BiCodeAlt } from "react-icons/bi";
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
    <div className={`w-72 rounded font-semibold select-none `}>
      <div className="text-lg px-2 font-bold">Settings</div>

      <div
        className="flex gap-2 items-center hover:bg-white w-full hover:text-blue-600 px-2.5 py-2"
        onClick={props.formatCode()}
      >
        <img className=" mix-blend-multiply !h-[24px] !w-[24px] "src="./Icons/CodeFormatter.png" alt="Code Formatter"></img>
        <div>Code Format</div>
      </div>
      <button className="flex items-center gap-2 hover:bg-white w-full hover:text-blue-600 px-2.5 py-2">
        <img className=" mix-blend-multiply !h-[24px] !w-[24px] "src="./Icons/Invite.png" alt="Invite"></img>
        <div>Invite Others</div>
      </button>
      <div className="flex gap-2 items-center hover:bg-white w-full hover:text-blue-600 px-2.5 py-2">
        <img className=" mix-blend-multiply !h-[24px] !w-[24px] "src="./Icons/KeyBoardShortcut.png" alt="Code Formatter"></img>
        <div>Keyboard Shortcuts</div>
      </div>
      <div className="flex gap-2 items-center justify-start w-full px-2.5 py-2 hover:bg-white hover:text-blue-600">
        <img className=" mix-blend-multiply !h-[24px] !w-[24px] "src="./Icons/FontSize.png" alt="FontSize"></img>
        <div className="mr-4">Font Size</div>
        <button
          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
          onClick={decreaseFontSize}
        >
          -
        </button>
        <span className="mx-2">{fontSize}px</span>
        <button
          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
          onClick={increaseFontSize}
        >
          +
        </button>
      </div>
      <div
        className="flex items-center gap-2 hover:bg-white w-full hover:text-blue-600 px-2.5 py-2 "
        onClick={() => {
          setWordWrap(!wordWrap);
        }}
      >
        <img className=" mix-blend-multiply !h-[24px] !w-[24px] "src="./Icons/WordWrap.png" alt="Word Wrap"></img>
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
        className=" hover:bg-white w-full hover:text-blue-600 px-2.5 py-2"
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
