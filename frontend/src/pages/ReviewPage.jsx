import React, { useState } from 'react';
import Textbox from '../Components/TextBox.jsx';
import Comment from '../Components/Comment.jsx';
import CodeBase from '../Components/CodeBase.jsx';
import TestCaseEditor from '../Components/TestCaseEditor.jsx';
import CommentsList from '../Components/CommentList.jsx';
import { useLocation } from "react-router-dom";

export default function ReviewPage() {
  const location = useLocation();
  const { submission } = location.state;

  const user = {
    pfp: 'https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png',
    username: 'Pratham9770',
    title: 'Malware Detection by Machine Learning',
    filename: 'main.c',
    language: 'c',
    code: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!\\n");\n\treturn 0;\n}\n`,
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature.",
  };
  
  const user2 = {
    pfp: 'https://3.bp.blogspot.com/-9YDmRdOQO5Y/W7ql9HZvhDI/AAAAAAAADJc/4WizmhdNBiArkst_o_3ArR2RmSyaYCCoACLcBGAs/s1600/-social%2Bmedia%2Bprofile%2Bpicture-3.jpg',
    username: 'Ramcharan',
  };
  
  const initialComments = [
    {
      user: user,
      feedback: 'This is a sample feedback from User1.',
      timestamp: '2024-07-11T10:00:00Z',
    },
    {
      user: user2,
      feedback: 'This is another sample feedback from User2.',
      timestamp: '2024-07-11T11:00:00Z',
    },
    {
      user: user,
      feedback: 'Another feedback from User1.',
      timestamp: '2024-07-11T12:00:00Z',
    },
    {
      user: user2,
      feedback: 'Additional feedback from User2.',
      timestamp: '2024-07-11T13:00:00Z',
    },
  ];

  const [comments, setComments] = useState(initialComments);
  const [reviewed, setReviewed] = useState(false);
  const [approved, setApproved] = useState(false);

  const handleSubmit = (feedback) => {
    const newComment = {
      user: user2,
      feedback,
      timestamp: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
    setReviewed(true);
  };

  const handleApproveComment = () => {
    setApproved(true);
  };

  return (
    <div className="flex flex-col">
      
      <div className="bg-white ml-10">
        <h1 className="text-4xl mb-2 font-bold font-actor">{user.title}</h1>
        <button
          className={`h-7 px-3 rounded-full text-xs ${
            !reviewed ? 'bg-lime-700 text-white' : 'bg-purple-950 text-white'
          }`}
        >
          {reviewed ? 'Reviewed 🔖' : 'To be Reviewed 📄'}
        </button>
      </div>
      <Textbox user={submission} />
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/2 md:w-1/2 lg:w-1/2">
          <CodeBase user={submission} />
        </div>
        <div className="sm:w-1/2 md:w-1/2 lg:w-1/2">
          <TestCaseEditor />
        </div>
      </div>
      <CommentsList comments={comments} />
      <Comment user={user2} handleSubmit={handleSubmit} onApprove={handleApproveComment} />
    </div>
  );
}
