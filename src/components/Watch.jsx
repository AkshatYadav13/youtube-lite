import { useSearchParams } from "react-router-dom";
import css from "../css/watch.module.css";
import { useEffect, useState } from "react";
import { BaseYtVideoApi } from "../constants/ytApi";
import AccLogo from "./AccLogo";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../utils/chatSlice";
import LiveChat from "./LiveChat";
import { useRef } from "react";
import { formatNumber } from "../constants/ytApi";
import Comments from "./Comments";
import RelatedVideos from "./RelatedVideos";
import { setIslive, setSingleVideo } from "../utils/appSlice";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [input, setinput] = useState("");
  const dispatch = useDispatch();
  const displayboxRef = useRef(null);
  const message = useSelector((store) => store.chat.message);
  const {singleVideo} = useSelector(store => store.app)
  const {islive} = useSelector(store => store.app)

  async function getVideoDetails() {
    const res = await fetch(`${BaseYtVideoApi}&id=${videoId}`);
    const data = await res.json();
    data.items[0].snippet.liveBroadcastContent === 'live' && dispatch(setIslive(true))
    dispatch(setSingleVideo(data.items[0]))
  }
  

  useEffect(() => {
    getVideoDetails();
  }, [videoId]);


  function sendMessage() {
    if (!input) return;
    dispatch(
      setMessage([{
        snippet:{
          displayMessage:input
        },
        authorDetails:{
          displayName:'Akshat',
          profileImageUrl:''
        }
      }])
    );
    setinput("");
  }

  useEffect(() => {
    if(displayboxRef.current)  displayboxRef.current.scrollTop = displayboxRef?.current.scrollHeight;
  }, [message]);


  return (
    <div className={css.main}>
      <div className={css.left}>

        <div  className={css.videobox}>
            <iframe
              className={css.videoScreen}
              width="100%"
              src={`https://www.youtube.com/embed/${videoId}?si=vJDzw6ft5Bki0FHW`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              frameBorder={0}
            ></iframe>
            <div className="infobox">
              <h3 className="title">{singleVideo?.snippet?.title}</h3>
              <div className={css.midbox}>
                <div className={css.midleft}>
                  <AccLogo
                    size={45}
                    url={singleVideo?.snippet?.thumbnails.high.url}
                  ></AccLogo>
                  <div className={css.namebox}>
                    <h3>{singleVideo?.snippet?.channelTitle}</h3>
                    <p>{formatNumber(`${singleVideo?.statistics?.viewCount}`)} Viems</p>
                  </div>
                  <button>Subscribe</button>
                </div>
                <div className={css.midright}>
                  <button>
                    <span className="material-symbols-outlined">thumb_up</span>
                    {formatNumber(`${singleVideo?.statistics?.likeCount}`)}
                    <span className="material-symbols-outlined">thumb_down</span>
                  </button>
                  <button>
                    <span className="material-symbols-outlined">share</span>
                    Share
                  </button>
                  <button>
                    <span className="material-symbols-outlined">download</span>
                    Download
                  </button>
                </div>
              </div>
            </div>
        </div>

        <Comments singleVideo={singleVideo} videoId={videoId}></Comments>
      </div>

      <div className={css.right}>
        {
          islive &&
            <div className={css.chatbox}>
            <div className={css.topbox}>
              <p>Live Chat</p>
              <span className="material-symbols-outlined">close</span>
            </div>
            <div ref={displayboxRef} className={css.displayBox}>
              <LiveChat></LiveChat>
            </div>
            <div className={css.inputbox}>
              <AccLogo
                url={
                  "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                }
                size={33}
              ></AccLogo>
              <input
                type="text"
                placeholder="chat"
                onChange={(e) => setinput(e.target.value)}
                value={input}
              />
              <span
                className="material-symbols-outlined iconHover "
                onClick={sendMessage}
              >
                send
              </span>
            </div>
            </div>
        }

        <RelatedVideos singleVideo={singleVideo}  ></RelatedVideos>
      </div>
    </div>
  );
};

export default Watch;

