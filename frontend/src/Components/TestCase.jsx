import { useEffect, useState } from "react";

const TestCase = (props) => {
  const [selected, setSelected] = useState(1);
  

  const handleSelected = (e) => {
    setSelected(e);
  };

  const handleTestCase = (e) => {
    const { name, value } = e.target;
    props.setTestCases({ ...props.testCases, [name]: value });
  };

  useEffect(() => {
    console.log(props.testCases[`textArea${selected}`]);
  }, [props.testCases, selected]);

  return (
    <div className="flex h-52">
      <div className="w-56 font-bold h-full overflow-y-scroll">
        {[1, 2, 3, 4,5,6,7,8].map((num) => (
          <div
            key={num}
            className={`border-r-2 border-[#d1d5db] h-14 w-full content-center p-2.5 cursor-pointer ${
              selected === num ? "text-blue-600 shadow-2xl bg-white" : ""
            }`}
            onClick={() => handleSelected(num)}
          >
            Test Case {num}
          </div>
        ))}
      </div>
      <textarea
        className="border-l-4 border-[#d1d5db] w-full p-2 bg-gray-100 focus:outline-none focus:border-t"
        placeholder="Please input your test cases..."
        name={`textArea${selected}`}
        value={props.testCases[`textArea${selected}`]}
        onChange={(e) => handleTestCase(e)}
      />
    </div>
  );
};

export default TestCase;
