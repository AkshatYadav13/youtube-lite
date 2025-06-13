import css from '../css/logobox.module.css'
import { useDispatch } from "react-redux";
import { toggleSideBar } from '../utils/appSlice';

const LogoBox = ({icon}) => {
  const dispatch = useDispatch();

  function handleOnClick() {
    dispatch(toggleSideBar());
  }
  return (
    <div className={`${css.container}`}>
      <span
        onClick={handleOnClick}
        className=" iconHover material-symbols-outlined"
      >
        {icon}
      </span>
      <div className={css.logobox}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_4N37TIgWC_QLpspNwGddZH8DhzljeYMFnA&s" alt="" />
        <p>YouTube</p>
      </div>
    </div>
  );
};

export default LogoBox;
