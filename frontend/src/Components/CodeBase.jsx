import React from 'react';
import { Editor } from "@monaco-editor/react";

const CodeBase = (props) => {
  return (
    <div className="flex flex-col h-screen ml-14 py-4 mt-8">
      <p className="text-base font-actor">CodeBase:</p>
      <div className="bg-neutral-100 flex items-center mt-4">
        <div className="px-3 py-1 bg-slate-100 text-gray-800 shadow-md rounded-md" style={{ paddingLeft: '15px' }}>
          {props.user.filename}
        </div>
      </div>
      <div className="flex-grow">
        <Editor
          options={{
            minimap: {
              enabled: false,
            },
            readOnly: true,
          }}
          height="400px"
          theme="vs-dark"
          language={props.user.language}
          value={props.user.code}
        />
      </div>
    </div>
  );
};

export default CodeBase;
