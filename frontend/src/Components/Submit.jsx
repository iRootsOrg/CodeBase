


const Submit = () => {
  const onSubmit = () => {
    console.log("Submitting");
  };
  return (
    <button
      className="border border-custom-gradient block w-24 px-2 py-1 text-center rounded bg-custom-gradient text-white"
      onClick={() => {
        onSubmit();
      }}
    >
     Submit
    </button>
  );
};

export default Submit;
