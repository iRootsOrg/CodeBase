import { useState, useEffect } from "react";
import { FaExpand, FaCompress } from "react-icons/fa";
import toast from "react-hot-toast";
const FullScreenToggle = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreenChange = () => {
    setIsFullScreen(document.fullscreenElement != null);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(()=>{toast.success("Entered Full Screen")}).catch((err) => {
        toast.error(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
      toast.success("Exited Full Screen");
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    
      <div
        onClick={toggleFullScreen}
        className="h-full flex justify-center items-center"
      >
        {isFullScreen ? (
          <FaCompress className="" />
        ) : (
          <FaExpand className="" />
        )}
      </div>
    
  );
};

export default FullScreenToggle;
