const RunAll = () => {
  const onRunAll = () => {
    console.log("Running All");
  };
  return (
    <button
      className="border border-custom-gradient block w-20% px-4 py-1 text-center rounded bg-custom-gradient text-white"
      onClick={() => {
        onRunAll();
      }}
    >
      Run All
    </button>
  );
};

export default RunAll;
