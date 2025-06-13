import css from '../css/chatmsg.module.css'
import AccLogo from './AccLogo.jsx'

const Chatmsg = ({msg}) => {
  return (
    <div className={css.msgbox}>
        <div className={css.infobox}>
            <AccLogo 
              url={msg?.authorDetails?.profileImageUrl  }
              size={22}
            ></AccLogo>
            <p>{msg?.authorDetails?.displayName}</p>
        </div>
        <p className={css.msg}>{msg?.snippet?.displayMessage}</p>
    </div>
  )
}

export default Chatmsg

