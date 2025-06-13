import { useState } from "react";
import css from "../css/btnList.module.css";
import { useDispatch } from "react-redux";
import { setCategory } from "../utils/appSlice";

const btnList = [
  "All",
  "Trending",
  "Javascript",
  "Cricket",
  "Algorithms",
  "Web Development",
  "Comedy",
  "Songs",
  "DSA",
  "Live",
  "Vocabulary",
  "BCA",
  "Computer Science",
  "IT",
  "TMKOC",
  "Vs code tricks",
  "master Ms excel",
  "Vlogs",
  "News",
  "AI",
  "Dance",
  "Sports",
  "Badminton",
  "React Js",
  "Frontend ",
  "IIT Jee",
  "App Development",
  "12th Board",
  "Racing",
  "Motor Vlogs",
];

const BtnList = () => {
  const dispatch = useDispatch()
  const [active, setactive] = useState("All");

  function videoByTag(btnName) {
    setactive(btnName);
    dispatch(setCategory(btnName))
  }

  return (
    <div className={css.btnList}>
      {btnList.map((btnName, index) => (
        <button
          key={index}
          onClick={() => videoByTag(btnName)}
          className={`${css.button} ${`${active === btnName && css.active }`} `}
        >
          {btnName}
        </button>
      ))}
    </div>
  );
};

export default BtnList;
