import { useState, useEffect } from "react";
import { FaExpand, FaCompress } from "react-icons/fa";
const FullScreenToggle = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreenChange = () => {
    setIsFullScreen(document.fullscreenElement != null);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    
      <button
        onClick={toggleFullScreen}
        className=""
      >
        {isFullScreen ? (
          <FaCompress className="" />
        ) : (
          <FaExpand className="" />
        )}
      </button>
    
  );
};

export default FullScreenToggle;
