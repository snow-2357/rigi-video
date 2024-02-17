/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

export default function VideoList({ data: list, currentVideo, changeVideo }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(list);
  const [searchNotification, setSeachNotification] = useState(false);

  const handleSearch = () => {
    const filteredData = list.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredData);
  };

  useEffect(() => {
    setSeachNotification(true);
    const timerId = setTimeout(() => {
      handleSearch();
      setSeachNotification(false);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  return (
    <div className="grid md:grid-cols items-start gap-4">
      <div className="relative">
        <input
          type="search"
          id="search"
          className="block w-full p-2 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500"
          placeholder="Search"
          value={searchTerm}
          // onChange={handleSearchInputChange}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {searchNotification && (
          <div
            role="status"
            className="text-white absolute end-1.5 bottom-0 font-medium rounded-lg text-sm py-1 px-4"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-900 animate-spin  fill-blue-100"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
      {searchResults.length < 1 ? (
        <p>Not found</p>
      ) : (
        <>
          {searchResults.map((e) => {
            if (currentVideo.id !== e.id)
              return (
                <VideoCard
                  key={e.id}
                  videoData={e}
                  changeVideo={(data) => changeVideo(data)}
                />
              );
          })}
        </>
      )}
    </div>
  );
}

// eslint-disable-next-line react/display-name
const VideoCard = React.memo(({ videoData, changeVideo }) => {
  return (
    <div
      className="flex flex-col sm:flex-row  sm:items-start gap-x-4 cursor-pointer"
      onClick={() => {
        changeVideo(videoData);
      }}
    >
      <div className="flex items-start gap-4 relative">
        <img
          alt="Video Thumbnail"
          src={videoData.img}
          className="bg-cover rounded-lg"
        />
        <div className="text-sm flex-1">
          <div className="font-medium line-clamp-2">{videoData.title}</div>
          <div className="text-xs text-gray-500 line-clamp-1 dark:text-gray-400">
            Rigi
          </div>
          <div className="text-xs text-gray-500 line-clamp-1 dark:text-gray-400">
            100K views · 2 days ago
          </div>
        </div>
      </div>
    </div>
  );
});
