import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import DropDown from "./DropDown";
import { CODE_SNIPPETS} from "../Utils/languages";
import { BiCodeAlt } from "react-icons/bi";
import Run from "./Run";
import Submit from "./Submit";
import RunAll from "./RunAll";
const CodeEditor = (props) => {
  const editorRef = useRef();
 
  

  useEffect(() => {
    props.setValue(CODE_SNIPPETS[props.language]);
  },[])

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  const onSelect = ( language ) => {
    props.setLanguage(language);
    console.log(language);
    if (props.boilerplatecode === true) {
      props.setValue(CODE_SNIPPETS[language]);
    }
  };
  
  const formatCode = () => {
    editorRef.current.getAction('editor.action.formatDocument').run();
  };
  

  return (
    <div>
      <div className="flex justify-between mr-4 items-center">
        <DropDown language={props.language} onSelect={onSelect} />

        <div className="flex gap-2 h-10">
          <button
            className="h-10 w-10  flex items-center justify-center bg-blue-500 text-white rounded-full focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
            onClick={formatCode}
          >
            <BiCodeAlt className="text-xl" />
          </button>
          <div
            className=" cursor-pointer font-semibold"
            onClick={() => props.handleLight()}
          >
            {props.lightmode === true ? (
              <button className="text-white bg-black  p-2 flex justify-between rounded border border-white">
                <div>🌙</div>
              </button>
            ) : (
              <button className="text-black bg-white  p-2 flex justify-between rounded border border-black">
                <div>☀️</div>
              </button>
            )}
          </div>
          <Run />
          <RunAll />
          <Submit />
        </div>
      </div>
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
        }}
        height="75vh"
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
  );
};
export default CodeEditor;