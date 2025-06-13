import SideBox from "./SideBox";
import SideOption from "./SideOption";
import css from "../css/sidebar.module.css";
import { IoHomeOutline } from "react-icons/io5";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import LogoBox from "./LogoBox";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const menu = [
  {
    title: "",
    options: [
      {
        icon: <IoHomeOutline />,
        name: "Home",
      },
      {
        icon: <SiYoutubeshorts />,
        name: "Shorts",
      },
      {
        icon: <MdOutlineSubscriptions />,
        name: "Subscription",
      },
    ],
  },
  {
    title: "You >",
    options: [
      {
        icon: <IoHomeOutline />,
        name: "Your channel",
      },
      {
        icon: <IoHomeOutline />,
        name: "History",
      },
      {
        icon: <IoHomeOutline />,
        name: "Playlist",
      },
      {
        icon: <IoHomeOutline />,
        name: "Watch Later",
      },
    ],
  },
  {
    title: "You >",
    options: [
      {
        icon: <IoHomeOutline />,
        name: "Your channel",
      },
      {
        icon: <IoHomeOutline />,
        name: "History",
      },
      {
        icon: <IoHomeOutline />,
        name: "Playlist",
      },
      {
        icon: <IoHomeOutline />,
        name: "Watch Later",
      },
    ],
  },
];

const Sidebar = () => {
  const SidebarRef = useRef(null);
  const open = useSelector((store) => store.app.open);
  const tl = useRef(null);

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });
    tl.current.to(SidebarRef.current, {
      left: "0vw",
      duration: 1,
    });
  }, []);

  useEffect(() => {
    if (open) {
      tl.current.play();
      document.body.style.overflow = "hidden";
    } else {
      tl.current.reverse();
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <div ref={SidebarRef} className={css.wraper}>
      <div className={css.sidebarWraper}>
        <LogoBox icon={"close"}></LogoBox>
        <div className={css.container}>
          {menu.map((item, index) => (
            <SideBox key={index}>
              <SideOption item={item}></SideOption>
            </SideBox>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
