import  { useRef, useState } from "react";
import css from "../css/watch.module.css";
import { formatNumber, RelatedVideoApi } from "../constants/ytApi";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RelatedVideos = () => {
  const [videos, setVideos] = useState([]);
  const { singleVideo } = useSelector((store) => store.app);
  const relatedvideoRef = useRef(null);
  const [pageToken, setPageToken] = useState("");
  const debounceRef = useRef(null);
  const [currVideoId,setCurrVideoId] = useState('')
  const {islive} = useSelector(store => store.app)

  async function fetchRelatedVideos() {
    try {
      const res = await fetch(
        `${RelatedVideoApi}&videoCategoryId=${singleVideo?.snippet.categoryId}&pageToken=${pageToken}`
      );
      const data = await res.json();
      const newVideos = pageToken && (currVideoId===singleVideo.id)? [...videos, ...data.items] : data.items;
      setVideos(newVideos);
      setPageToken(data.nextPageToken || '' );
    } catch (error) {
      console.log(error);
    }
    finally{
      setCurrVideoId(singleVideo.id)
    }
  }

  useEffect(() => {
    setPageToken('')
    singleVideo!=''  && fetchRelatedVideos();
  }, [singleVideo]);

  function handleScroll() {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      const videoBox = relatedvideoRef.current;
      if (
        videoBox.scrollTop + videoBox.clientHeight >=
        videoBox.scrollHeight - 100
      ) {
        fetchRelatedVideos();
      }
    }, 300);
  }

  useEffect(() => {
    const videoBox = relatedvideoRef.current;

    videoBox.addEventListener("scroll", handleScroll);

    return () => {
      videoBox.removeEventListener("scroll", handleScroll);
      clearTimeout(debounceRef.current);
    };
  }, [pageToken]);

  return (
    <div style={{height: islive ? '100vh' : '195vh'}} ref={relatedvideoRef} className={`${css.relatedVideo} scrollbar`}>
      {videos.map((singleVideo, idx) => (
        <Link
          to={`/watch?v=${
            typeof singleVideo.id === "object"
              ? singleVideo?.id?.videoId
              : singleVideo.id
          }`}
          key={`${
            typeof singleVideo.id === "object"
              ? singleVideo?.id?.videoId + idx
              : singleVideo.id + idx
          }`}
          className="link"
        >
          <div className={css.minWrap}>
            <img src={singleVideo?.snippet?.thumbnails.high.url} alt="" />
            <div className={css.details}>
              <p>{singleVideo?.snippet?.title}</p>
              <span>{singleVideo?.snippet.channelTitle}</span>
              <span>{`${formatNumber(
                singleVideo.statistics.viewCount
              )} views`}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RelatedVideos;
