import React from "react";
import css from "../css/menubar.module.css";
import { IoHomeOutline } from "react-icons/io5";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { Link } from "react-router-dom";


const options = [
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
];

const Menubar = () => {
  return (
    <div className={css.menubar}>
      {options.map((option,index) => (
        <Link key={index}  to='/' className="link">
        <div className={`${css.option} iconHover`}>
            {option.icon}
            <small>{option.name}</small>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default Menubar;
