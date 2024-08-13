import { useEffect, useState, useRef } from "react";
import { restrictedPatterns } from "../Utils/restrictedtext";
import toast from "react-hot-toast";

const TestCase = (props) => {
  const lastInvalidInputRef = useRef("");
  // console.log(props.testCases[props.testCaseSelected]);
  const handleSelected = (e) => {
    props.setTestCaseSelected(e);
  };

  const handleTestCase = (e) => {
    const { value } = e.target;
    let isValid = true;

    restrictedPatterns.forEach((pattern) => {
      if (pattern.test(value)) {
        isValid = false;
        return; // Exit the forEach loop early
      }
    });

    if (isValid) {
      const updatedTestCases = [...props.testCases];
      updatedTestCases[props.testCaseSelected].input.content = value;
      props.setTestCases(updatedTestCases);
      lastInvalidInputRef.current = ""; // Reset the last invalid input
    } else {
      if (lastInvalidInputRef.current !== value) {
        lastInvalidInputRef.current = value;
        console.log("Restricted characters detected");
        toast.error("Your input contains restricted characters.", {
          id: "restricted-chars-error",
          duration: 800,
        });
      }
    }
  };

  const addTestCase = async() => {
    console.log("adding test case");

    const newTestCase = {
      input: { content: "" },
      output: {
        error: false,
        errorCount: 0,
        warning: 0,
        errors: 0,
        content: "No Output",
      },
    };

    
    props.setTestCaseSelected(props.testCases.length);
    props.setTestCases([...props.testCases, newTestCase]);

  };

  useEffect(() => {
    console.log(props.testCases[props.testCaseSelected]);
  }, [props.testCaseSelected]);

  return (
    <div className="flex h-64 ">
      <div
        className={`w-72 sm:w-56 font-bold h-full overflow-y-scroll select-none ${
          props.lightmode
            ? "scrollbar-light text-black"
            : "scrollbar-dark text-white"
        }`}
      >
        {props.testCases.map((testCase, index) => (
          <div
            key={index}
            className={`w-full ${
              props.lightmode ? "border-[#d1d5db]" : "border-[#2e2a24]"
            } border-r-2 h-14 w-full content-center p-2.5 cursor-pointer ${
              props.testCaseSelected === index
                ? `shadow-2xl ${
                    props.lightmode
                      ? "bg-white text-blue-600 "
                      : "bg-[#1A1A1A] text-[#00BFFF] "
                  }`
                : ""
            }`}
            onClick={() => handleSelected(index)}
          >
            <div className="flex justify-between sm:w-auto items-center">
              Test Case {index + 1}
              {props.testCases[index].output.error === false ? (
                props.testCases[index].output.content === "No Output" ? (
                  <div>
                    <img src="./Icons/notreview.png" alt="🔸" />
                  </div>
                ) : (
                  <div>
                    <img src="./Icons/Done.png" alt="✅" />
                  </div>
                )
              ) : (
                <div>
                  {" "}
                  <img src="./Icons/err.png" alt="🚫" />
                </div>
              )}
            </div>
          </div>
        ))}

        <button
          className={`${
            props.lightmode
              ? "border-[#d1d5db] text-gray-700"
              : "border-[#2e2a24] text-slate-200"
          } border-r-2 h-14 w-full flex justify-start p-2.5  cursor-pointer shadow-2xl `}
          onClick={() => {
            addTestCase();
          }}
        >
          New Test Case +
        </button>
      </div>
      <div className="flex flex-col h-full w-full  items-end ">
        <textarea
          className={`border-l-4 w-full h-full p-2.5 ${
            props.lightmode
              ? "bg-gray-100 text-black border-[#d1d5db] scrollbar-light"
              : "bg-[#1e1e1e] text-white border-[#2e2a24] scrollbar-dark"
          } focus:outline-none focus:border-t`}
          placeholder="Please input your test cases..."
          name={`testCase${props.testCaseSelected}`}
          value={props.testCases[props.testCaseSelected].input.content}
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
