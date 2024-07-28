import React from 'react';


const Tooltip = ({ text, children }) => {
  return (
    <div className="relative inline-block">
      <div className="group">
        {children}
        {text && (
          <span
            className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out bg-gray-600 text-white text-xs px-2 py-1 absolute left-8 -top-0 z-10 whitespace-nowrap rounded"
          >
            {text}
          </span>
        )}
      </div>
    </div>
  );
};



export default Tooltip;
