


const Submit = (props) => {
  const onSubmit = () => {
    console.log("Submitting");
  };
  return (
    <button
      className={`block w-24 px-2 py-1 text-center rounded ${props.lightmode ? "bg-custom-gradient":"bg-custom-gradient-inverted"} text-white`}
      onClick={() => {
        onSubmit();
      }}
    >
     Submit
    </button>
  );
};

export default Submit;
