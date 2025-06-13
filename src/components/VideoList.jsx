import React, { useRef, useState } from "react";
import { CategoryVideosApi, YtVideoApi } from "../constants/ytApi";
import { useEffect } from "react";
import VideoBox, { VideoSkeleton } from "./VideoBox";
import css from "../css/videolist.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHomeVideo } from "../utils/appSlice";

const VideoListSkeleton = ({ count = 12 }) => {
  return (
    <div className={css.videoContainer}>
      {Array.from({ length: count }, (_, index) => (
        <VideoSkeleton key={index} />
      ))}
    </div>
  );
};

const VideoList = () => {
  const { videos, category } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const [pageToken, setPageToken] = useState("");
  const scrollRef = useRef(false);
  const [currCategory, setCurrCategory] = useState(category);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  async function FetchVideos() {
    try {
      if (scrollRef.current) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }

      const response = await fetch(`${YtVideoApi}&pageToken=${pageToken}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const newVideos = scrollRef.current && (currCategory === category) ? [...videos, ...data?.items] : data?.items;

      dispatch(setHomeVideo(newVideos));
      setPageToken(data.nextPageToken || '');
    } catch (err) {
      console.log(err);
    } finally {
      scrollRef.current = false;
      setCurrCategory(category);
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }

  async function fetchVideoByCategory() {
    try {
      if (scrollRef.current) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }

      const res = await fetch(`${CategoryVideosApi}&pageToken=${pageToken}&q=${category}`);
      const data = await res.json();
      const newVideos = scrollRef.current && (currCategory === category) ? [...videos, ...data?.items] : data?.items;

      dispatch(setHomeVideo(newVideos));
      setPageToken(data.nextPageToken || '');
    } catch (error) {
      console.log(error);
    } finally {
      scrollRef.current = false;
      setCurrCategory(category);
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }

  useEffect(() => {
    if (category === "All") {
      FetchVideos();
    } else {
      fetchVideoByCategory();
    }
  }, [category]);

  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        if (!scrollRef.current && !isLoadingMore) {
          scrollRef.current = true;
          category === "All" ? FetchVideos() : fetchVideoByCategory();
        }
      }
    }, 500);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageToken, category, isLoadingMore]);

  if (isLoading && (!videos || videos.length === 0)) {
    return <VideoListSkeleton count={12} />;
  }

  return (
    <>
      <div className={css.videoContainer}>
        {videos?.map((video, idx) => (
          <Link
            to={`/watch?v=${
              typeof video.id === "object" ? video?.id?.videoId : video.id
            }`}
            key={`${
              typeof video.id === "object" ? video?.id?.videoId + idx : video.id + idx
            }`}
            className="link"
          >
            <VideoBox video={video}></VideoBox>
          </Link>
        ))}
      </div>
      
      {/* Show loading skeletons when loading more */}
      {isLoadingMore && (
        <div className={css.videoContainer}>
          {Array.from({ length: 6 }, (_, index) => (
            <VideoSkeleton key={`loading-${index}`} />
          ))}
        </div>
      )}
    </>
  );
};

export default VideoList;