import Video from "./Video";
import { useState } from "react";
import VideoList from "./VideoList";
import Data from "../Data";

export default function Wrapper() {
  const [currentVideo, setCurrentVideo] = useState(Data[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <Video
          video={currentVideo}
          autoPlay={() => {
            setCurrentVideo((prev) => {
              const nextIndex = (prev.id + 1) % Data.length;
              return Data[nextIndex];
            });
          }}
          className="w-full lg:w-[75%]"
        />
      </div>
      <div>
        <VideoList
          data={Data}
          currentVideo={currentVideo}
          changeVideo={(video) => {
            setCurrentVideo(video);
          }}
        />
      </div>
    </div>
  );
}
