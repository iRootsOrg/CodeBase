

const Run = (props) => {
    const onRun = () => {
        console.log("Running");
    }
    return (
      <button
        className={`  block w-20% px-4 py-1 text-center rounded ${
          props.lightmode
            ? "bg-custom-gradient "
            : "bg-custom-gradient-inverted "
        } text-white`}
        onClick={() => {
          onRun();
        }}
      >
        Run
      </button>
    );
}

export default Run;