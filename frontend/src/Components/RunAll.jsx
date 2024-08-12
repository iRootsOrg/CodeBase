
import toast from "react-hot-toast";
import axios from "axios";
import { server,compiler } from "../service/api";
import { useEffect } from "react";
const RunAll = (props) => {

    const updateChangeCodeWrapper = () => {
      return new Promise(async (resolve) => {
        await props.updateChangeCode();
        resolve();
      });
  };
  
  const updateTestCases = (testCases, data) => {
    data.testcaseOutputs.forEach((testcaseOutput,index) => {
      const { outputContent } = testcaseOutput;
      if (testCases[index]) {
        testCases[index].output.content = outputContent;
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

   useEffect(() => {
     if (props.RunOnAll === true) {
       onRunAll();
       props.setRunOnAll(false);
     }
     // else {
     //   toast.error("Please until last run is executed");
     // }

     props.setRunOnAll(false);
   }, [props.RunOnAll]);

  
  const onRunAll = async() => {
    try {
      console.log("Running");

      // Update the code and save it before proceeding
      await updateChangeCodeWrapper();
      console.log("Code updated and saved");

      // Trigger the process and wait for the output
      const responseData = await props.sendTestCases(props.testCases, "runAll");

      // Update the output in the state
      await props.updateChangeOutput(responseData, null);

      toast.success("Execution completed successfully!");
    } catch (error) {
      console.error("Error during execution:", error);
      toast.error("An error occurred during execution.");
    }

  };


  return (
    <button
      className={`block w-20% px-4 py-1 text-center rounded ${
        props.lightmode
          ? "bg-custom-gradient"
          : "bg-custom-gradient-inverted "
      } text-white`}
      onClick={() => {
        onRunAll();
      }}
    >
      Run All
    </button>
  );
};

export default RunAll;
