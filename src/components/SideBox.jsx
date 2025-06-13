import css from '../css/sidebox.module.css'

const SideBox = ({children}) => {
  return (
    <div className={css.box} >{children}</div>
  )
}

export default SideBox