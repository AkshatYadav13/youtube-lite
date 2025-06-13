import css from "../css/videobox.module.css";
import { ChannelVideoApi } from "../constants/ytApi";
import { useEffect, useState } from "react";
import AccLogo from "./AccLogo";

const VideoBox = ({ video }) => {
  const [channelLogo, setchannelLogo] = useState("");

  async function getChannelLogo() {
    try {
      const res = await fetch(`${ChannelVideoApi}&id=${video?.snippet?.channelId}`);
      const data = await res.json();
      setchannelLogo(data.items[0].snippet.thumbnails.high.url);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getChannelLogo();
  }, []);

  return (
    <div className={css.videobox}>
      <img
        src={`${video?.snippet?.thumbnails?.maxres?.url || video?.snippet?.thumbnails?.high?.url}`}
        className={css.thumbnail}
      ></img>
      <div className={css.infobox}>
        <AccLogo url={channelLogo} size={40}></AccLogo>
        <div className={css.descBox}>
          <div className={css.title}>{video?.snippet?.title}</div>
          <p className={css.channelname}>{video?.snippet?.channelTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoBox;


export const VideoSkeleton = () => {
  return (
    <div className={`${css.videobox} ${css.skeleton}`}>
      <div className={`${css.thumbnail} ${css.skeletonThumbnail}`}></div>
      <div className={css.infobox}>
        <div className={css.skeletonAvatar}></div>
        <div className={css.descBox}>
          <div className={css.skeletonTitle}></div>
          <div className={css.skeletonTitleSecond}></div>
          <div className={css.skeletonChannel}></div>
        </div>
      </div>
    </div>
  );
};