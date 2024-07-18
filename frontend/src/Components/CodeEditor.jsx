import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import DropDown from "./DropDown";
import { CODE_SNIPPETS } from "../Utils/languages";
import { BiCodeAlt } from "react-icons/bi";
import Submit from "./Submit";
import Fullscreen from "./FullScreen";
import ToolBar from "./ToolBar";
import Folder from "./Folder";
import History from "./History";
import { AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
import toast from "react-hot-toast";
const CodeEditor = (props) => {
  const editorRef = useRef();
  const [toolBar, setToolBar] = useState(true);
  const [selected, setSelected] = useState(0);
  const [settingsopen, setSettingsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [wordWrap, setWordWrap] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    props.setLanguage("Choose_Language");
    props.setValue(CODE_SNIPPETS["Choose_Language"]);
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ wordWrap: wordWrap ? "on" : "off" });
    }
  }, [wordWrap]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    if (props.value === CODE_SNIPPETS[props.language]) {
      props.setValue(CODE_SNIPPETS[language]);
    }

    props.setLanguage(language);
    console.log(language);
  };

  const setToolbarNull = () => {
    setSelected(0);
    props.setFolderOpen(false);
    props.setOpenNewFile(false);
    props.setOpenExtraNewFile(false);
    setSettingsOpen(false);
    props.setShareOpen(false);
    props.setInfoOpen(false);
  };

  const formatCode = () => {
    editorRef.current.getAction("editor.action.formatDocument").run();
    toast.success("Code Formatted");
  };

  const handleToolBar = () => {
    setToolBar(!toolBar);
    setToolbarNull();
  };

  return (
    <div className={`h-full`}>
      <div className="flex justify-between m-4 items-center">
        <div className="cursor-pointer flex gap-2">
          {toolBar === true ? (
            <img
              src="./Icons/Close.png"
              alt="Close"
              className="h-[32px] w-[32px]"
              onClick={() => {
                handleToolBar();
              }}
            />
          ) : (
            <img
              src="./Icons/More.png"
              alt="More"
              className="h-[32px] w-[32px]"
              onClick={() => {
                handleToolBar();
              }}
            />
          )}

          {props.fileIndex !== -1 || props.extraFileIndex !== -1 ? (
            <DropDown
              language={props.language}
              onSelect={onSelect}
              lightmode={props.lightmode}
            />
          ) : (
            ""
          )}
        </div>

        <div className={`flex justify-between items-center gap-4 `}>
          <div className=" flex gap-5 h-10">
            <button
              className="h-10 w-10  flex items-center justify-center bg-blue-500 text-white rounded-full focus:outline-none focus:bg-blue-600 "
              onClick={formatCode}
            >
              <BiCodeAlt className="text-xl" />
            </button>
            <div
              className={` cursor-pointer h-10 w-10 ${
                props.lightmode
                  ? "text-black bg-white border-black"
                  : "text-white bg-[#1e1e1e] border-white"
              }  p-2 flex justify-center items-center rounded border `}
            >
              <Fullscreen />
            </div>
            <div
              className=" cursor-pointer font-semibold"
              onClick={() => props.handleLight()}
            >
              {props.lightmode === true ? (
                <button className="text-white h-10 w-10 bg-[#1e1e1e]  p-2 flex justify-between rounded border border-white">
                  <AiOutlineMoon className="h-6 w-6" />
                </button>
              ) : (
                <button className="text-black  h-10 w-10 bg-white  p-2 flex justify-between rounded border border-black">
                  <AiOutlineSun className="h-6 w-6" />
                </button>
              )}
            </div>

            <Submit lightmode={props.lightmode} />
          </div>
        </div>
      </div>

      <div
        className={`flex h-full ${
          props.lightmode ? "" : "bg-[#1e1e1e]"
        } `}
      >
        <ToolBar
          folderfiles={props.folderfiles}
          setFolderFiles={props.setFolderFiles}
          folderopen={props.folderopen}
          setFolderOpen={props.setFolderOpen}
          value={props.value}
          setValue={props.setValue}
          updateChangeCode={props.updateChangeCode}
          zipAndDownload={props.zipAndDownload}
          handleFileUpload={props.handleFileUpload}
          lightmode={props.lightmode}
          setLightMode={props.setLightMode}
          handleLight={props.handleLight}
          shareOpen={props.shareOpen}
          setShareOpen={props.setShareOpen}
          infoOpen={props.infoOpen}
          setInfoOpen={props.setInfoOpen}
          formatCode={formatCode}
          toolBar={toolBar}
          setToolBar={setToolBar}
          folderIndex={props.folderIndex}
          setFolderIndex={props.setFolderIndex}
          fileIndex={props.fileIndex}
          setFileIndex={props.setFileIndex}
          extraFileIndex={props.extraFileIndex}
          setExtraFileIndex={props.setExtraFileIndex}
          newFileName={props.newFileName}
          setNewFileName={props.setNewFileName}
          opennewfile={props.opennewfile}
          setOpenNewFile={props.setOpenNewFile}
          openExtraNewFile={props.openExtraNewFile}
          setOpenExtraNewFile={props.setOpenExtraNewFile}
          selected={selected}
          setSelected={setSelected}
          settingsopen={settingsopen}
          setSettingsOpen={setSettingsOpen}
          historyOpen={historyOpen}
          setHistoryOpen={setHistoryOpen}
          language={props.language}
          setLanguage={props.setLanguage}
          wordWrap={wordWrap}
          setWordWrap={setWordWrap}
          keyboardShortcut={props.keyboardShortcut}
          setKeyboardShortcut={props.setKeyboardShortcut}
          fontSize={fontSize}
          setFontSize={setFontSize}
          email={props.email}
          setEmail={props.setEmail}
          fileChecked={props.fileChecked}
          outputChecked={props.outputChecked}
          setFileChecked={props.setFileChecked}
          setOutputChecked={props.setOutputChecked}
        />
        <div className="h-full">
          {props.folderopen === true ? (
            <div className="w-48 ">
              <Folder
                folderfiles={props.folderfiles}
                setFolderFiles={props.setFolderFiles}
                opennewfolder={props.opennewfolder}
                setOpenNewFolder={props.setOpenNewFolder}
                value={props.value}
                setValue={props.setValue}
                folderIndex={props.folderIndex}
                setFolderIndex={props.setFolderIndex}
                fileIndex={props.fileIndex}
                setFileIndex={props.setFileIndex}
                language={props.language}
                setLanguage={props.setLanguage}
                extraFileIndex={props.extraFileIndex}
                setExtraFileIndex={props.setExtraFileIndex}
                newFileName={props.newFileName}
                setNewFileName={props.setNewFileName}
                opennewfile={props.opennewfile}
                setOpenNewFile={props.setOpenNewFile}
                openExtraNewFile={props.openExtraNewFile}
                setOpenExtraNewFile={props.setOpenExtraNewFile}
                extraNewFileName={props.extraNewFileName}
                setExtraNewFileName={props.setExtraNewFileName}
                newFolderName={props.newFolderName}
                handleFolderName={props.handleFolderName}
                addNewFolder={props.addNewFolder}
                lightmode={props.lightmode}
                setNewFolderName={props.setNewFolderName}
                outputFile={props.outputFile}
                setOutputFile={props.setOutputFile}
                initialOutput={props.initialOutput}
              />
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="">
          {historyOpen === true ? (
            <div
              className={`w-48 ${
                props.lightmode ? "text-black" : "text-white"
              }`}
            >
              <History />
            </div>
          ) : (
            ""
          )}
        </div>

        <Editor
          options={{
            minimap: {
              enabled: true,
            },
            wordWrap: wordWrap ? "on" : "off",
            fontSize: fontSize,
          }}
          height="100%"
          theme={props.lightmode ? "light" : "vs-dark"}
          language={props.language}
          defaultValue={CODE_SNIPPETS[props.language]}
          onMount={onMount}
          value={props.value}
          onChange={(value) => {
            props.setValue(value);
            props.setBoilerPlateCode(false);
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
