import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco, a11yDark ,javascript} from "react-syntax-highlighter/dist/esm/styles/hljs";

const Output = (props) => {
  //Sample Error Text
  let errorText = `main.c: In function ‘main’:
main.c:7:30: error: ‘z’ undeclared (first use in this function)
    7 |     printf("Sum of x+y = %i",z);
      |                              ^
main.c:7:30: note: each undeclared identifier is reported only once for each function it appears in `;
  //Sample output Text
  let outputText = `Hello\nWorld`;

  const handleChange = (event) => {
    props.setOption(event.target.value);
  };

  return (
    <div
      className={`flex justify-center w-full ${
        props.lightmode ? "bg-white text-black" : "bg-[#1e1e1e] text-white"
      }`}
    >
      <div
        className={`border ${
          props.lightmode ? "" : ""
        } flex flex-col h-auto w-full `}
      >
        <div className="flex justify-between p-3 border-b border-gray-600 text-lg">
          <div className="font-semibold">{props.option} : </div>
          <div className=" ">
            <select
              className={`${
                props.lightmode
                  ? "bg-custom-gradient "
                  : "bg-custom-gradient-inverted "
              }  rounded p-1 focus:outline-none text-white`}
              onChange={(event) => {
                handleChange(event);
              }}
              defaultValue="Output"
            >
              <option value="Output" className="text-black">
                Output
              </option>
              <option value="Graphs" className="text-black">
                Graphs
              </option>
              
            </select>
          </div>
        </div>

        {props.option === "Output" ? (
          <div>
            <div
              className={`flex flex-col items-start p-3 border-b-2 border-dashed ${
                props.lightmode ? "border-black" : "border-gray-100"
              } `}
            >
              <p>Compilation Status : {props.outputFile.CompilationStatus}</p>
              <p>Execution Time : {props.outputFile.ExecutionTime}s</p>
            </div>
            <div className="">
              {props.testCases[props.testCaseSelected].output.error ===
              true ? (
                <div
                  className={`text-red-700 flex flex-col items-start border-b-2 border-dashed ${
                    props.lightmode ? "border-black" : "border-gray-100"
                  } p-3`}
                >
                  <div className="flex p-3 gap-4">
                    <p>
                      Errors :{" "}
                      {
                        props.testCases[props.testCaseSelected].output
                          .errorCount
                      }
                    </p>
                    <p>
                      Warning :{" "}
                      {props.testCases[props.testCaseSelected].output.warning}
                    </p>
                  </div>

                  {props.testCases[props.testCaseSelected].output.errors !==
                  null ? (
                    <div className="overflow-x-auto max-w-full">
                      <SyntaxHighlighter
                        language="javascript"
                        style={props.lightmode ? `${docco}` : `${a11yDark}`}
                        className="text-left !text-red-600"
                      >
                        {
                          props.testCases[props.testCaseSelected].output
                            .errors
                        }
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}

              {props.testCases[props.testCaseSelected].output.error ===
              false ? (
                <div
                  className={`border-b-2 border-dashed ${
                    props.lightmode ? "border-black" : "border-gray-100"
                  } p-3 overflow-x-auto max-w-full`}
                >
                  <SyntaxHighlighter
                    language="javascript"
                    style={props.lightmode ? docco : a11yDark}
                    className="text-left"
                  >
                      {props.testCases[props.testCaseSelected].output.content}
                      {/* {`${outputText}`} */}
                  </SyntaxHighlighter>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col items-start p-3">
              <div className="font-medium">Additional Info : </div>
              <div>Files Compiled : {props.outputFile.FilesCompiled}</div>
            </div>
          </div>
        ) : (
          ""
        )}

        {props.option === "Graphs" ? <div>Graph output</div> : ""}
        
      </div>
    </div>
  );
};

export default Output;
