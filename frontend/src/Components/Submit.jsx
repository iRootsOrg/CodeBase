const Submit = ({ onSubmit,lightmode }) => {
  
  
  
  return (
    <button

      className={`block h-full w-24 px-2 py-1 text-center rounded ${props.lightmode ? "bg-custom-gradient":"bg-custom-gradient-inverted"} text-white`}
      onClick={() => {
        onSubmit();
      }}
    >
     Submit
    </button>
  );
};

export default Submit;
