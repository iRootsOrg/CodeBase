import { useState } from "react";

const ToolBar = () => {
  const [selected, setSelected] = useState(0);

  const handleSelected = (e) => {
    if (selected === e) {
      setSelected(0);
    } else {
      setSelected(e);
    }
  };

  return (
    <div className="border-r-2 border-[#d1d5db] flex flex-col h-full w-14 items-center pr-2 gap-4 pt-2 pb-2">
      <div
        className={`${
          selected === 1 ? "border-l-4 border-blue-900" : ""
        } cursor-pointer hover:border-l-4 hover:border-blue-900 `}
        onClick={() => handleSelected(1)}
      >
        <img
          src="./Icons/SelectLanguage.png"
          alt="Select Language"
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
          src={"./Icons/SelectFile.png"}
          alt="Select File"
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
          src={"./Icons/Save.png"}
          alt="Save"
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
          src={"./Icons/Folder.png"}
          alt="Folder"
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
          src={"./Icons/Export.png"}
          alt="Export"
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
          src={"./Icons/Download.png"}
          alt="Download"
          className="!h-[32px] !w-[32px]"
        />
      </div>
      <div
        className={`${
          selected === 7 ? "border-l-4 border-blue-900" : ""
        } cursor-pointer hover:border-l-4 hover:border-blue-900`}
        onClick={() => handleSelected(7)}
      >
        <img
          src={"./Icons/History.png"}
          alt="History"
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
          src={"./Icons/Clipboard.png"}
          alt="Clipboard"
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
          src={"./Icons/Settings.png"}
          alt="Settings"
          className="!h-[32px] !w-[32px]"
        />
      </div>
      <div
        className={`${
          selected === 10 ? "border-l-4 border-blue-900" : ""
        } cursor-pointer hover:border-l-4 hover:border-blue-900`}
        onClick={() => handleSelected(10)}
      >
        <img
          src={"./Icons/Share.png"}
          alt="Share"
          className="!h-[32px] !w-[32px]"
        />
      </div>
      <div
        className={`${
          selected === 11 ? "border-l-4 border-blue-900" : ""
        } cursor-pointer hover:border-l-4 hover:border-blue-900`}
        onClick={() => handleSelected(11)}
      >
        <img
          src={"./Icons/Info.png"}
          alt="Info"
          className="!h-[32px] !w-[32px]"
        />
      </div>
    </div>
  );
};

export default ToolBar;
