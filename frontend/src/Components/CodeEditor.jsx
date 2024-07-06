import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import DropDown from "./DropDown";
import { CODE_SNIPPETS } from "../Utils/languages";
import { BiCodeAlt } from "react-icons/bi";
import Submit from "./Submit";
import Fullscreen from "./FullScreen";
import ToolBar from "./ToolBar";
import Folder from "./Folder";
import { FaCheck, FaTrash } from "react-icons/fa";
const CodeEditor = (props) => {
  const editorRef = useRef();
  const [toolBar, setToolBar] = useState(false);
   const [selected, setSelected] = useState(0);
   const [settingsopen, setSettingsOpen] = useState(false);

  useEffect(() => {
    props.setLanguage("Choose_Language");
    props.setValue(CODE_SNIPPETS["Choose_Language"]);
  }, []);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  const onSelect = (language) => {
    props.setLanguage(language);
    console.log(language);
    if (props.boilerplatecode === true) {
      props.setValue(CODE_SNIPPETS[language]);
    }
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
  };

  const handleToolBar = () => {
    setToolBar(!toolBar);
    setToolbarNull();
  };

  return (
    <div className="h-[90%]">
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

          <DropDown language={props.language} onSelect={onSelect} />
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className=" flex gap-5 h-10">
            <button
              className="h-10 w-10  flex items-center justify-center bg-blue-500 text-white rounded-full focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
              onClick={formatCode}
            >
              <BiCodeAlt className="text-xl" />
            </button>
            <div className=" cursor-pointer h-10 w-10 text-black bg-white  p-2 flex justify-center items-center rounded border border-black">
              <Fullscreen />
            </div>
            <div
              className=" cursor-pointer font-semibold"
              onClick={() => props.handleLight()}
            >
              {props.lightmode === true ? (
                <button className="text-white h-10 w-10 bg-black  p-2 flex justify-between rounded border border-white">
                  <div>🌙</div>
                </button>
              ) : (
                <button className="text-black  h-10 w-10 bg-white  p-2 flex justify-between rounded border border-black">
                  <div>☀️</div>
                </button>
              )}
            </div>

            <Submit />
          </div>
        </div>
      </div>

      <div className="flex h-full bg-gray-100">
        <ToolBar
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
        />
        <div className="">
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
                
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <Editor
          options={{
            minimap: {
              enabled: false,
            },
          }}
          height=""
          theme="vs-dark"
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
