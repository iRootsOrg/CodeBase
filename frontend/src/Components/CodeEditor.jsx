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

  const formatCode = () => {
    editorRef.current.getAction("editor.action.formatDocument").run();
  };

  const handleToolBar = () => {
    setToolBar(!toolBar);
  };

  return (
    <div className="h-[90%]">
      <div className="flex justify-between mr-4 items-center">
        <div
          className="cursor-pointer"
          onClick={() => {
            handleToolBar();
          }}
        >
          <img
            src="./Icons/Close.png"
            alt="Close"
            className="h-[32px] w-[32px] ml-2"
          />
        </div>
        <DropDown language={props.language} onSelect={onSelect} />

        <div className="flex gap-2 h-10">
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
              />

              {props.opennewfolder === true ? (
                <div className="flex gap-2 hover:text-blue-600 font-semibold text-lg p-2 w-full items-center">
                  <div>📁</div>
                  <input
                    value={props.newFolderName}
                    onChange={(e) => {
                      props.handleFolderName(e);
                    }}
                    className="w-20 focus:outline-none"
                  ></input>
                  <div className="flex justify-around items-center w-full">
                    <button
                      onClick={() => {
                        props.addNewFolder();
                      }}
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => {
                        props.setOpenNewFolder(false);
                        props.setNewFolderName("");
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
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
