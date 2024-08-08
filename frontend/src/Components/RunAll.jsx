
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
     console.log("Running All");

    await updateChangeCodeWrapper();
      console.log("code change complete ");
      
    

   
    //Change into files
    

    // toast.promise(updateChangeCodeWrapper(), {
    //   loading: "Saving...",
    //   success: <b>Save Successful!</b>,
    //   error: <b>Could not save</b>,
    // });

    // POST Request with toast.promise
    //Get the details

    // toast.promise(, {
    //   loading: "Running...",
    //   success: <b>Run Successful!</b>,
    //   error: <b>Could not run</b>,
    // });

      console.log("sending the data");

      const responseData = await props.sendTestCases(props.testCases, "runall");

      console.log(responseData);
    
    const form = new FormData();
    form.append('response', responseData);
    form.append('folderIndex', props.folderIndex);
    form.append('fileIndex', props.fileIndex);
    form.append('testCaseSelected', props.testCaseSelected);
    const compilerResponse = await axios.post(
      `${compiler}/initiate-compilation`,
      form
    );
    console.log(compilerResponse);

       console.log("Getting the output");
       const responseOutput = await axios.get(
         `${server}/api/v1/file/testcase-outputs/${responseData.mainFileId}`
       );
       console.log(responseOutput);



 console.log("setting output");
 await setOutputFileWrapper(responseOutput);
 console.log("Output setup completed");
   
    //loader for compiling

    await props.updateChangeOutput(responseOutput.data, null);

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
