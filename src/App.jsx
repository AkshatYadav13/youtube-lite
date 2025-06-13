import "./css/App.css";
import Navbar from "./components/Navbar";
import Sidebar from './components/Sidebar'
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Menubar from "./components/Menubar";

function App() {
  const open = useSelector(store => store.app.open)
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="main">
        <Menubar></Menubar>
        <div className={`feedWraper`}>
        <Outlet></Outlet>
      </div>
      </div>
    </>
  );
}

export default App;
