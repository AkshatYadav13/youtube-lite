import Searchbar from "./Searchbar";
import css from "../css/navbar.module.css";
import LogoBox from "./LogoBox";
import AccLogo from "./AccLogo";
import ToggleTheme from "./ToggleTheme.jsx";
import { useEffect, useState } from "react";

function Navbar() {

  const [bodyWidth,setBodyWidth] = useState(document.body.clientWidth)
  const [smallview,setSmallview] = useState(false)

  function handleWidth(){
    setBodyWidth(document.body.clientWidth)
  }


  useEffect(()=>{
    window.addEventListener('resize',handleWidth)
    return ()=> window.removeEventListener('resize',handleWidth);
  },[]);

  return (
    <div className={css.container}>
      {
        smallview 
        ?
        <div className={css.phoneSearch} >
          <div>
            <span onClick={()=> setSmallview(!smallview)} className="iconHover material-symbols-outlined">arrow_back</span>
          </div>
          <Searchbar></Searchbar>
        </div> 
        :
        <div className={css.navbar} >
          <LogoBox icon={'menu'} ></LogoBox>
          {
            bodyWidth>700?
            <Searchbar></Searchbar>
            :
            <span onClick={()=> setSmallview(!smallview)}  style={{borderRadius:'50%',border:'1px solid gray',padding:'2px'}} className="iconHover material-symbols-outlined">search</span>
          }
          <div className={css.navEnd}>
            <ToggleTheme></ToggleTheme>
            <span className="iconHover material-symbols-outlined">video_call</span>
            <span className="iconHover material-symbols-outlined">
              notifications
            </span>
            <AccLogo url={'https://banner2.cleanpng.com/20190227/zox/kisspng-clip-art-computer-icons-openclipart-user-vector-gr-my-svg-png-icon-free-download-14-352-onlinewe-1713904397626.webp'} size={40}></AccLogo>
          </div>
        </div>
      }
      </div>
  );
}
export default Navbar;
