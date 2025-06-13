import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../utils/appSlice'

const ToggleTheme = () => {
    const theme = useSelector(store => store.app.theme)
    const dispatch = useDispatch()

    function handleOnClick(){
        dispatch(toggleTheme())
        document.body.className = (theme==='light' ? 'dark-mode' : '')
    }

  return (
    <span 
        className="material-symbols-outlined  iconHover"
        onClick={handleOnClick}    
    >{`${theme==='light' ? 'dark_mode' : 'light_mode'}`}</span>
)
}

export default ToggleTheme