import React, { useState } from 'react';

export default function Comment(props) {
  const { role } = props;
  const [feedback, setFeedback] = useState('');
  const [warning, setWarning] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackChange = (event) => {
    if (event.target.value.length <= 500) {
      setFeedback(event.target.value);
      if (event.target.value.length > 0) {
        setWarning(false);
      }
    }
  };

  const handleSubmit = () => {
    if (feedback.trim().length === 0) {
      setWarning(true);
      return;
    }
    if (props.handleSubmit) {
      props.handleSubmit(feedback);
    }
    setSubmitted(true);
    if (role === 'author') {
      setFeedback('Reply to this conversation...'); 
    }
  };

  return (
    <div className="ml-10 mr-40 mb-40 bg-white rounded-lg">
      <div className="flex items-start">
        <img
          src={props.user.pfp}
          alt={props.user.username}
          className="h-12 w-12 object-cover rounded-full mr-4"
        />
        <div className="flex flex-col w-full">
          <span className="text-base font-actor">{props.user.username}</span>
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            className={`bg-neutral-100 font-actor text-sm text-gray-600 shadow-md p-4 rounded-lg mt-1 resize-none min-h-400 max-h-80 focus:outline-none overflow-auto ${warning ? 'border border-red-500' : ''}`}
            placeholder={role === 'author' ? 'Reply to this conversation...' : 'Write your feedback here...'}
            maxLength={500}
            disabled={submitted}
          />
          {!submitted && (
            <div className="flex justify-end">
              <span className="text-sm text-gray-400">{feedback.length}/500</span>
            </div>
          )}
          {warning && (
            <p className="text-sm text-red-500 mt-1">Feedback cannot be empty.</p>
          )}
          <button
            onClick={handleSubmit}
            className={`mt-2 ml-auto px-6 py-2 md text-white font-bold bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 focus:outline-none ${feedback.trim().length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={feedback.trim().length === 0}
          >
            {!submitted ? (role === 'author' ? 'Reply' : 'Submit Review') : 'Approve'}
          </button>
        </div>
      </div>
    </div>
  );
}
