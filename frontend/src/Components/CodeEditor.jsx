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
import ToolTip from "./ToolTip";
import { useNavigate} from 'react-router-dom';

const CodeEditor = (props) => {
  const editorRef = useRef();
  const [toolBar, setToolBar] = useState(false);
   const [selected, setSelected] = useState(0);
  const [settingsopen, setSettingsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [lastSubmission, setLastSubmission] = useState(null);
  const [error, setError] = useState("");
  const navigate=useNavigate();
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [newDescription, setNewDescription] = useState("");
 
  

  useEffect(() => {
    props.setLanguage("Choose_Language");
    props.setValue(CODE_SNIPPETS["Choose_Language"]);
  }, []);

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
  if (editorRef.current && editorRef.current.getValue) {
    const language = editorRef.current.getValue();
    const newSubmission = {
      pfp: 'https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png',
      username: 'Pratham9770',
      title: 'Malware Detection by Machine Learning',
      filename: 'main.c',
      language: language,
      code: language,
      description: newDescription,
      reviewed: false,
      role: "author"
    };
  }
  const handleSubmission = () => {
    if (lastSubmission && !lastSubmission.reviewed) {
      if (window.confirm("Your previous submission is under review. Do you wish to change it?")) {
        setShowDescriptionModal(true);
      }
    } else {
      setShowDescriptionModal(true);
    }
  };

  const handleConfirmDescription = () => {
    if (editorRef.current && editorRef.current.getValue) {
      const language = editorRef.current.getValue();
      const newSubmission = {
        pfp: 'https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png',
        username: 'Pratham9770',
        title: 'Malware Detection by Machine Learning',
        filename: 'main.c',
        language: language,
        code: language,
        description: newDescription,
        reviewed: false,
        role: "author"
      };

      setLastSubmission(newSubmission);
      setError("");
      setShowDescriptionModal(false);
      navigate('/review', { state: { s: 'value_of_s', submission: newSubmission } });
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
       {error && <div className="error">{error}</div>}
      <div className="flex justify-between m-4 items-center">
        <ToolTip text={(toolBar?"Close":"Toolbar")}>
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
            <DropDown language={props.language} onSelect={onSelect} />
          ) : (
            ""
          )}
        </div>
        </ToolTip>

        <div className="flex justify-between items-center gap-4">
          <div className=" flex gap-5 h-10">
            <ToolTip text="Format Code">
            <button
              className="h-10 w-10  flex items-center justify-center bg-blue-500 text-white rounded-full focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
              onClick={formatCode}
            >
              <BiCodeAlt className="text-xl" />
            </button>
            </ToolTip>
            <ToolTip text="Full Screen">
            <div className=" cursor-pointer h-10 w-10 text-black bg-white  p-2 flex justify-center items-center rounded border border-black">
              <Fullscreen />
            </div>
            </ToolTip>
            <ToolTip text={props.lightmode?"Dark Mode":"Light Mode"}>
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
            </ToolTip>

            {showDescriptionModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
    <div className="description-modal-container w-full max-w-screen-lg">
      <div className="description-modal p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter description..."
          className="w-full h-48 p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
        />
        <button
          onClick={handleConfirmDescription}
          className="mt-4 border border-custom-gradient block w-32 md:w-24 px-2 py-1 ml-auto text-center rounded bg-custom-gradient text-white focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}

        <Submit onSubmit={handleSubmission} />
      
          </div>
        </div>
      </div>

      <div className="flex h-full bg-gray-100">
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

        <div className="">
          {historyOpen === true ? (
            <div className="w-48 ">
              <History />
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
