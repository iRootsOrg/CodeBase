import React from 'react';

export default function TextBox(props) {
  return (
    <div className="mt-10 ml-10 mr-40 bg-white">
      <div className="flex items-start">
        <img
          src={props.user.pfp}
          alt={props.user.username}
          className="h-12 w-12 object-cover rounded-full mr-4"
        />
        <div className="flex flex-col">
          <span className="text-base font-actor">{props.user.username}</span>
          <p className="bg-neutral-100 text-sm text-gray-600 shadow-md p-4 rounded-lg mt-1">
            {props.user.description}
          </p>
        </div>
      </div>
    </div>
  );
}
