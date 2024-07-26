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
import { useNavigate } from 'react-router-dom';
import { AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
import toast from "react-hot-toast";
import { restrictedPatterns } from "../Utils/restrictedtext";
import { IoIosMenu } from "react-icons/io";
const CodeEditor = (props) => {
  const editorRef = useRef();
  
  const [selected, setSelected] = useState(0);
  const [settingsopen, setSettingsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const [lastSubmission, setLastSubmission] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [newDescription, setNewDescription] = useState("");
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

    editor.onDidChangeModelContent((event) => {
      const value = editor.getValue();
      for (let pattern of restrictedPatterns) {
        if (pattern.test(value)) {
          // toast.error("Not allowed");
          
          // Remove the restricted text by restoring the previous value
          editor.executeEdits("", [
            {
              range: editor.getModel().getFullModelRange(),
              text: value.replace(pattern, ""),
              
            },
          ]);
          break;
        }
      }
      return;
    });
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
    toast.success("Code Formatted");
  };

  const handleToolBar = () => {
    props.setToolBar(!props.toolBar);
    setToolbarNull();
  };

  const [editorWidth, setEditorWidth] = useState("100%");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640 && props.toolBar === true) {
        // Tailwind's 'sm' breakpoint is 640px
        setEditorWidth("87%");
      } else {
        setEditorWidth("100%");
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });


  

  return (

   
 
      <div className={`h-full`}>
        {error && <div className="error">{error}</div>}
        <div className="flex justify-between m-4 items-center">
          <ToolTip text={(toolBar ? "Close" : "Toolbar")}>
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
          </ToolTip>

          <div className="flex flex-row gap-4 mr-1 ml-auto ">
            <div className="flex gap-5 h-10 ">
              <ToolTip text="Format Code">
                <button
                  className="h-10 w-10  flex items-center justify-center bg-blue-500 text-white rounded-full focus:outline-none focus:bg-blue-600 "
                  onClick={formatCode}
                >
                  <BiCodeAlt className="text-xl" />
                </button>
              </ToolTip>

                  <div className="cursor-pointer h-10 w-10  text-black bg-white  p-2 flex justify-center items-center rounded border border-black">
                <ToolTip text="Full Screen">
                  <div
                    className={` cursor-pointer h-10 w-10 ${
                      props.lightmode
                        ? "text-black bg-white border-black"
                        : "text-white bg-[#1e1e1e] border-white"
                    }  p-2 flex justify-center items-center rounded border `}
                  >
                    <Fullscreen />
              </div>
                  
                </ToolTip>
                <ToolTip text={props.lightmode ? "Dark Mode" : "Light Mode"}>
                  <div
                    className=" cursor-pointer font-semibold "
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
                </ToolTip>
                <Submit onSubmit={handleSubmission} lightmode={props.lightmode} />

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


                
               
              </div>
            </div>

    <div className={`h-full w-full flex flex-col `}>
      <div className="flex justify-between  items-center w-full  h-20 p-2">
        <div className="cursor-pointer sm:flex gap-2  ">
          {props.toolBar === true ? (
            <img
              src="./Icons/Close.png"
              alt="Close"
              className="h-[32px] w-[32px] hidden sm:block"
              onClick={() => {
                handleToolBar();
              }}
            />
          ) : (
            <img
              src="./Icons/More.png"
              alt="More"
              className="h-[32px] w-[32px] hidden sm:block"
              onClick={() => {
                handleToolBar();
              }}
            />
          )}

          <IoIosMenu
            size={36}
            onClick={() => {
              handleToolBar();
            }}
            className="block sm:hidden"
          />

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

        <div className=" flex gap-2 h-10 items-center sm:gap-4">
          <button
            className="h-10 w-10  sm:flex items-center justify-center bg-blue-500 text-white rounded-full focus:outline-none focus:bg-blue-600 hidden "
            onClick={formatCode}
          >
            <BiCodeAlt className="text-xl" />
          </button>
          <div
            className={` cursor-pointer w-10 h-[94%] ${
              props.lightmode
                ? "text-black bg-white border-black"
                : "text-white bg-[#1e1e1e] border-white"
            }   rounded border `}
          >
            <Fullscreen />
          </div>
          <div
            className=" cursor-pointer font-semibold h-full w-10 "
            onClick={() => props.handleLight()}
          >
            {props.lightmode === true ? (
              <div className="text-white h-full w-full bg-[#1e1e1e]  flex justify-center items-center rounded border border-white">
                <AiOutlineMoon className="h-6 w-6" />
              </div>
            ) : (
              <div className="text-black  bg-white h-full w-full flex justify-center items-center  rounded border border-black">
                <AiOutlineSun className="h-6 w-6" />
              </div>
            )}

          </div>

          <Submit lightmode={props.lightmode} />
        </div>

      <div
        className={`flex h-full w-full ${
          props.lightmode ? "" : "bg-[#1e1e1e]"
        } `}
      >
        <div className="w-auto">
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
            toolBar={props.toolBar}
            setToolBar={props.setToolBar}
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
        </div>
        <div className="h-full">
          {props.folderopen === true ? (
            <div
              className={`absolute z-10 left-12 w-36 sm:h-[80vh] sm:w-48 h-[55vh] ${
                props.lightmode ? "bg-gray-100" : "bg-[#1e1e1e]"
              }`}
            >
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


        <div className="h-full">
          {historyOpen === true ? (
            <div
              className={`absolute z-10 left-12 w-36 sm:h-[80vh] sm:w-48 h-[55vh]  ${
                props.lightmode
                  ? "bg-gray-100 text-black"
                  : "bg-[#1e1e1e] text-white"
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
            lineNumbers: "on",
          }}
          height="100%"
          width={editorWidth}
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