import toast from "react-hot-toast";

const Run = (props) => {
  //Sample output File
  const sampleOutput = {
    CompilationStatus: "Compilation Completed",
    ExecutionTime: "20",
    FilesCompiled: `File123123`,
    tc: [
      {
        input: [
          {
            content: "",
          },
        ],
        output: [
          {
            error: false,
            erorrCount: 0,
            warning: 0,
            errors: 0,
            content: "This is a sample output",
          },
        ],
      },
    ],
  };

  const onRun = async() => {
    console.log("Running");

    //POST Request
  //   toast.promise((), {
  //    loading: 'Running...',
  //    success: <b>Run Successful!</b>,
  //    error: <b>Could not run.</b>,
  //  })
    //Get the details

    props.setOutputFile(sampleOutput)
     
    
    //loader for compiling

     props.updateChangeOutput(sampleOutput);
    
    
    
      
    
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
