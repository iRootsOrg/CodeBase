
import toast from "react-hot-toast";
import axios from "axios";
import { compiler } from "../service/api";

const RunAll = (props) => {

    const updateChangeCodeWrapper = () => {
      return new Promise(async (resolve) => {
        await props.updateChangeCode();
        resolve();
      });
    };
  
  const onRunAll = async() => {
     console.log("Running All");

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

    const responseData = await props.sendTestCases(props.testCases,"runall").then(() => {
      console.log("sent test case");
    });
    
    const form = new FormData();
    form.append('response', responseData);
    form.append('folderIndex', props.folderIndex);
    form.append('fileIndex', props.fileIndex);
    form.append('testCaseSelected', props.testCaseSelected);
    const compilerResponse = await axios.post(`${compiler}`, form);




    // await setOutputFileWrapper(sampleOutput);
    
   
    //loader for compiling

    // await props.updateChangeOutput(sampleOutput);

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
