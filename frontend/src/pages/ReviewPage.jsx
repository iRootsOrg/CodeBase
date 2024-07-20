import React, { useState } from 'react';
import Textbox from '../Components/TextBox.jsx';
import Comment from '../Components/Comment.jsx';
import CodeBase from '../Components/CodeBase.jsx';
import TestCaseEditor from '../Components/TestCaseEditor.jsx';

export default function ReviewPage() {
  const user = {
    pfp: 'https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png',
    username: 'Pratham9770',
    title: 'Malware Detection by Machine Learning',
    filename: 'main.c',
    language: 'c',
    code: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!\\n");\n\treturn 0;\n}\n`,
    description:
      " Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature.",
  };
  const user2 = {
    pfp: 'https://3.bp.blogspot.com/-9YDmRdOQO5Y/W7ql9HZvhDI/AAAAAAAADJc/4WizmhdNBiArkst_o_3ArR2RmSyaYCCoACLcBGAs/s1600/-social%2Bmedia%2Bprofile%2Bpicture-3.jpg',
    username: 'Ramcharan',
  };
  const [Reviewed, setReviewed] = useState(false);

  const handleSubmit = (status) => {
    setReviewed(status === 'reviewed');
  };

  return (
    <div className="flex flex-col">
       
      <div className="bg-white ml-10">
        <h1 className="text-4xl mb-2 font-bold font-actor">{user.title}</h1>
        <button
          className={`h-7 px-3 rounded-full text-xs ${
            !Reviewed ? 'bg-lime-700 text-white' : 'bg-purple-950 text-white'
          }`}
        >
          {Reviewed ? 'Reviewed 🔖' : 'To be Reviewed 📄'}
        </button>
      </div>
      <Textbox user={user} />
      <div className="flex">
        <div className="w-1/2">
          <CodeBase user={user} />
        </div>
        <div className="w-1/2">
          <TestCaseEditor />
        </div>
      </div>
      
      <Comment user={user2} handleSubmit={handleSubmit} />
    </div>
  );
}
