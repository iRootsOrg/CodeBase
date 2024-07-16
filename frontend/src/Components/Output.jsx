import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco,a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Output = (props) => {
  const [option, setOption] = useState("Output");
  const [compilation, setCompilation] = useState("Not Started");
  const [time, setTime] = useState(0);
  const [error, setError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [warning, setWarning] = useState(0);
  const [errors, setErrors] = useState("");

  const [output, setOutput] = useState("Not Compiled");
  const [files, setFiles] = useState("Still Not Compiled");

  //Sample Error Text
  let errorText = `main.c: In function ‘main’:
main.c:7:30: error: ‘z’ undeclared (first use in this function)
    7 |     printf("Sum of x+y = %i",z);
      |                              ^
main.c:7:30: note: each undeclared identifier is reported only once for each function it appears in `;
  //Sample output Text
  let outputText = `Ramcharan`;

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <div
      className={`flex justify-center m-2 ${
        props.lightmode ? "bg-white text-black" : "bg-[#1e1e1e] text-white"
      }`}
    >
      <div
        className={`border-2 ${
          props.lightmode ? "border-black" : "border-gray-100"
        } flex flex-col h-auto w-[70vw]`}
      >
        <div className="flex justify-between p-3 border-b border-gray-600 text-lg">
          <div className="font-semibold">{option} : </div>
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
              <option value="Terminal" className="text-black">
                Terminal
              </option>
            </select>
          </div>
        </div>

        {option === "Output" ? (
          <div>
            <div
              className={`flex flex-col items-start p-3 border-b-2 border-dashed ${
                props.lightmode ? "border-black" : "border-gray-100"
              } `}
            >
              <p>Compilation Status : {compilation}</p>
              <p>Execution Time : {time}</p>
            </div>
            <div className="">
              {error === true ? (
                <div
                  className={`text-red-700 flex flex-col items-start border-b-2 border-dashed ${
                    props.lightmode ? "border-black" : "border-gray-100"
                  } p-3`}
                >
                  <div className="flex p-3 gap-4">
                    <p>Errors : {errorCount}</p>
                    <p>Warning : {warning}</p>
                  </div>

                  {errors !== null ? (
                    <div className="overflow-x-auto max-w-full">
                      <SyntaxHighlighter
                        language="bash"
                        style={props.lightmode ? `${docco}` : `${a11yDark}`}
                        className="text-left !text-red-600"
                      >
                        {errors}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}

              {error === false ? (
                <div
                  className={`border-b-2 border-dashed ${
                    props.lightmode ? "border-black" : "border-gray-100"
                  } p-3 overflow-x-auto max-w-full`}
                >
                  <SyntaxHighlighter
                    language="bash"
                    style={props.lightmode ? docco : a11yDark}
                    className="text-left"
                  >
                    {output}
                  </SyntaxHighlighter>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col items-start p-3">
              <div className="font-medium">Additional Info : </div>
              <div>Files Compiled : {files}</div>
            </div>
          </div>
        ) : (
          ""
        )}

        {option === "Graphs" ? <div>Graph output</div> : ""}
        {option === "Terminal" ? <div>Terminal output</div> : ""}
      </div>
    </div>
  );
};

export default Output;
