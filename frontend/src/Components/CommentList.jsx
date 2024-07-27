import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const CommentsList = ({ comments }) => {
  return (
    <div className="ml-10 mr-40 mb-10 bg-white rounded-lg">
      {comments.map((comment, index) => (
        <div key={index} className="flex items-start mb-4">
          <img
            src={comment.user.pfp}
            alt={comment.user.username}
            className="h-12 w-12 object-cover rounded-full mr-4"
          />
          <div className="flex flex-col w-full">
            <span className="text-base font-actor">{comment.user.username}</span>
            <p className="bg-neutral-100 font-actor text-sm text-gray-600 shadow-md p-4 rounded-lg mt-1">
              {comment.feedback}
            </p>
            <span className="text-sm text-gray-400 ml-auto">{formatDistanceToNow(new Date(comment.timestamp))} ago</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
