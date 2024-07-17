


<<<<<<< HEAD
const Submit = ({ onSubmit }) => {
  
  return (
    <button
      className="border border-custom-gradient block w-24 px-2 py-1 text-center rounded bg-custom-gradient text-white"
      onClick={onSubmit}
=======
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
>>>>>>> 8b24744dad48e2f4dd09fcecaaaeeda5308d2d7a
    >
     Submit
    </button>
  );
};

export default Submit;
