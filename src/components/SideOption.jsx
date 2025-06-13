import { useSelector } from "react-redux";
import css from "../css/sideoption.module.css";

const SideOption = ({ item }) => {
  const open = useSelector(store => store.app.open)

  return (
    <div>
      {item.title && <div className={`${css.title} ${!open && ''} `}>{item.title}</div>}
      <div className={`${css.optionBox}`}>
        {item.options.map((option,index) => (
          <div className={css.box} key={index} >
            {option.icon}
            <a className={`${!open && ''}`}  href={`/${option.name}`}>{option.name}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideOption;
