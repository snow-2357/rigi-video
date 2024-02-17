/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";

function Video({ video, autoPlay }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [waitNotification, setWaitNotification] = useState(false);
  const [autoplaySwitch, setAutoplaySwitch] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    setCurrentTime(0);
    const videoElement = videoRef.current;

    const updateTime = () => setCurrentTime(videoElement.currentTime);
    const updateDuration = () => {
      if (videoElement.duration !== Infinity) {
        setDuration(videoElement.duration);
      }
    };

    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        togglePlay();
      }
    };

    videoElement.addEventListener("timeupdate", updateTime);
    videoElement.addEventListener("loadedmetadata", updateDuration);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      videoElement.removeEventListener("timeupdate", updateTime);
      videoElement.removeEventListener("loadedmetadata", updateDuration);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [video.id]);

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (event) => {
    const seekTime = parseFloat(event.target.value);
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    if (
      autoplaySwitch &&
      currentTime !== 0 &&
      duration !== 0 &&
      currentTime === duration
    ) {
      setWaitNotification(true);
      const timeoutId = setTimeout(() => {
        autoPlay();
        setWaitNotification(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime, duration]);

  return (
    <div className="relative" key={video.id}>
      {waitNotification && (
        <div className="absolute flex justify-center items-center bg-gray-600 bg-opacity-70 rounded-lg w-full h-full">
          <h1 className="py-0">Next Video...</h1>
        </div>
      )}
      <video
        className="rounded-t-lg"
        ref={videoRef}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        <source src={video.link} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="w-full bg-gray-700 py-4 rounded-b-lg">
        <span className="text-white text-xs uppercase px-2">
          <input
            className=" mr-4 w-[97%]"
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
        </span>
        <div className="flex flex-row justify-between px-4 ">
          <div>{formatTime(currentTime)}</div>
          <div className="border-none cursor-pointer " onClick={togglePlay}>
            {isPlaying ? (
              <PauseIcon className="h-8 w-8" />
            ) : (
              <PlayIcon className="h-8 w-8" />
            )}
          </div>
          <div>{formatTime(duration)}</div>
        </div>
        <div className="mx-4 my-1 flex justify-end">
          <label className="inline-flex items-center cursor-pointer px-4">
            <span className="px-2">Auto Play:</span>
            <input
              type="checkbox"
              value={autoplaySwitch}
              checked={autoplaySwitch}
              onChange={() => {
                setAutoplaySwitch(!autoplaySwitch);
              }}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <label>
            Playback Speed:
            <select
              className="ml-2 p-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </label>
        </div>
      </div>
      <h1 className="text-xl font-semibold py-4 px-4">{video.title}</h1>
    </div>
  );
}

export default Video;

function PlayIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function PauseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="4" height="16" x="6" y="4" />
      <rect width="4" height="16" x="14" y="4" />
    </svg>
  );
}
