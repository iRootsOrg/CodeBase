

const Run = () => {
    const onRun = () => {
        console.log("Running");
    }
    return (
      <button
        className="border border-black block w-20% px-4 py-1 text-center rounded bg-black text-white"
        onClick={() => {
          onRun();
        }}
      >
        Run
      </button>
    );
}

export default Run;