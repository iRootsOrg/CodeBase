import { useEffect, useState, useRef } from "react";
import { restrictedPatterns } from "../Utils/restrictedtext";
import toast from "react-hot-toast";

const TestCase = (props) => {
  const [selected, setSelected] = useState(1);
  const lastInvalidInputRef = useRef("");

  const handleSelected = (e) => {
    setSelected(e);
  };

  const handleTestCase = (e) => {
    const { name, value } = e.target;
    let isValid = true;

    restrictedPatterns.forEach((pattern) => {
      if (pattern.test(value)) {
        isValid = false;
        return; // Exit the forEach loop early
      }
    });

    if (isValid) {
      props.setTestCases({ ...props.testCases, [name]: value });
      lastInvalidInputRef.current = ""; // Reset the last invalid input
    } else {
      if (lastInvalidInputRef.current !== value) {
        lastInvalidInputRef.current = value;
        console.log("Restricted characters detected");
        toast.error("Your input contains restricted characters.", {
          id: "restricted-chars-error",
        });
      }
    }
  };

  useEffect(() => {
    console.log(props.testCases[`textArea${selected}`]);
  }, [props.testCases, selected]);

  return (
    <div className="flex h-52 ">
      <div
        className={`w-56 font-bold h-full overflow-y-scroll ${
          props.lightmode
            ? "scrollbar-light text-black"
            : "scrollbar-dark text-white"
        }`}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <div
            key={num}
            className={`${
              props.lightmode ? "border-[#d1d5db]" : "border-[#2e2a24]"
            } border-r-2 h-14 w-full content-center p-2.5 cursor-pointer ${
              selected === num
                ? `shadow-2xl ${
                    props.lightmode
                      ? "bg-white text-blue-600 "
                      : "bg-[#1A1A1A] text-[#00BFFF] "
                  }`
                : ""
            }`}
            onClick={() => handleSelected(num)}
          >
            Test Case {num}
          </div>
        ))}
      </div>
      <div className="flex flex-col h-full w-full overflow-y-auto items-end ">
        <textarea
          className={`border-l-4 w-full h-full p-2 ${
            props.lightmode
              ? "bg-gray-100 text-black border-[#d1d5db] scrollbar-light"
              : "bg-[#1e1e1e] text-white border-[#2e2a24] scrollbar-dark"
          } focus:outline-none focus:border-t`}
          placeholder="Please input your test cases..."
          name={`textArea${selected}`}
          value={props.testCases[`textArea${selected}`]}
          onChange={handleTestCase}
        />
        <button
          className={`p-2.5 ${props.lightmode ? "text-black" : "text-white"}`}
          onClick={() => {
            props.setReportBugOpen(true);
          }}
        >
          🐞 Report Bug
        </button>
      </div>
    </div>
  );
};

export default TestCase;
