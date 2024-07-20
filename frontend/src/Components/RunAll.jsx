const RunAll = (props) => {
  const onRunAll = () => {
    console.log("Running All");
   // toast.promise((), {
  //    loading: 'Running All...',
  //    success: <b>Run Successful!</b>,
  //    error: <b>Could not run.</b>,
  //  })
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
