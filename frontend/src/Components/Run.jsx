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


  const setOutputFileWrapper = (output) => {
    return new Promise(async (resolve) => {
      await props.setOutputFile(output);
      await props.setTestCases(output.tc);
      resolve();
    });
  };

  const updateChangeCodeWrapper = () => {
    return new Promise(async(resolve) => {
      await props.updateChangeCode();
      resolve();
    });
  };

  const onRun = async() => {
    console.log("Running");

    await updateChangeCodeWrapper().then(() => {
      console.log("complete code change")
      
    });

   
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

    const responseData = await props.sendTestCases(props.testCases, "run");

    console.log(responseData);
    
    const form = new FormData();
    form.append('response', responseData);
    form.append('folderIndex', props.folderIndex);
    form.append('fileIndex', props.fileIndex);
    form.append('testCaseSelected', props.testCaseSelected);
    // console.log(form);
    const compilerResponse = await axios.post(`${compiler}/compiler`, form);

    //Get the output
    
    const responseOutput = await axios.get(
      `${server}/api/v1/file/testcase-outputs/${responseData.mainFileId}`
    );
    console.log(responseOutput);




    // await setOutputFileWrapper(sampleOutput);
    
   
    //loader for compiling

    // await props.updateChangeOutput(sampleOutput);
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
