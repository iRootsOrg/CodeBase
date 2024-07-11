import React from 'react';
import { Editor } from "@monaco-editor/react";

const CodeBase = (props) => {
  return (
    <div className="flex flex-col h-screen ml-14 py-4 mt-8 relative">
      <p className="text-base font-actor">CodeBase:</p>
      <div className="bg-neutral-100 flex items-center mt-4">
        <div className="px-3 py-1 bg-slate-100 text-gray-800 shadow-md rounded-md" style={{ paddingLeft: '15px' }}>
          {props.user.filename}
        </div>
      </div>
      <div className="flex-grow relative overflow-hidden">
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
          className="blur-sm "
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-0 text-white z-10">
          <span className="text-4xl mb-4" role="img" aria-label="locked">🔒</span>
          <p className="text-md text-center">Would you like to view code?</p>
          <p className="text-md text-center mb-4">However, payment is required.</p>
          <button className="px-6 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 focus:outline-none">Pay $25</button>
        </div>
      </div>
    </div>
  );
};

export default CodeBase;
