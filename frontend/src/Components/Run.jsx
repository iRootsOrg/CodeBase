import toast from "react-hot-toast";
import axios from "axios";
import { compiler } from "../service/api";
import { server } from "../service/api";
const FormData = require("form-data");

const Run = (props) => {
  //Sample output File
  const sampleOutput = {
    CompilationStatus: "Compilation Completed",
    ExecutionTime: "20",
    FilesCompiled: `File123123`,
    tc: [
      {
        input: { content: "Sample Input" },
        output: {
          error: false,
          errorCount: 0,
          warning: 0,
          errors: 0,
          content: "This is sample Output",
        },
      },
    ],
  };
  

const updateTestCases = (testCases, data) => {
  data.testcaseOutputs.forEach((testcaseOutput) => {
    const { outputContent } = testcaseOutput;
    if (testCases[props.testCaseSelected]) {
      testCases[props.testCaseSelected].output.content = outputContent;
    }
  });
  return testCases;
};

const setOutputFileWrapper = async (responseData) => {
  return new Promise(async (resolve) => {
    const updatedTestCases = updateTestCases(
      [...props.testCases],
      responseData.data
    );
    await props.setTestCases(updatedTestCases);
    resolve();
  });
};


  const updateChangeCodeWrapper = () => {
    return new Promise(async (resolve) => {
      console.log("Update Change code wrapper")
      await props.updateChangeCode();
      resolve();
    });
  };

const onRun = async () => {
  try {
    console.log("Running");

    // Update the code and save it before proceeding
    await updateChangeCodeWrapper();
    console.log("Code updated and saved");

    // Trigger the process and wait for the output
    const responseData = await props.sendTestCases(props.testCases, "run");

    // Update the output in the state
    await props.updateChangeOutput(responseData, props.testCaseSelected);

    toast.success("Execution completed successfully!");
  } catch (error) {
    console.error("Error during execution:", error);
    toast.error("An error occurred during execution.");
  }
};

  return (
    <button
      className={`  block w-20% px-4 py-1 text-center rounded ${
        props.lightmode ? "bg-custom-gradient " : "bg-custom-gradient-inverted "
      } text-white`}
      onClick={() => {
        onRun();
      }}
    >
      Run
    </button>
  );
};

export default Run;
