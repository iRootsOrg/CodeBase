import { useRef, useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import DropDown from "./DropDown";
import { CODE_SNIPPETS} from "../Utils/languages";
import { BiCodeAlt } from "react-icons/bi";
import Run from "./Run";


const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  
  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };
  const formatCode = () => {
    editorRef.current.getAction('editor.action.formatDocument').run();
  };

  return (
    <div>
      <div className="flex justify-between mr-4 items-center">
        <DropDown language={language} onSelect={onSelect} />
        <div className="flex">
        <button className="h-10 w-10 mx-3 flex items-center justify-center bg-blue-500 text-white rounded-full focus:outline-none focus:bg-blue-600 hover:bg-blue-600" onClick={formatCode}>
  <BiCodeAlt className="text-xl" />
</button>

        <Run />
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
        language={language}
        defaultValue={CODE_SNIPPETS[language]}
        onMount={onMount}
        value={value}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
};
export default CodeEditor;