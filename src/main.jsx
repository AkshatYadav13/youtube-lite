import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {Provider} from "react-redux";
import store from "./utils/store.js";
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import App from "./App.jsx";
import Feed from "./components/Feed";
import Watch from "./components/Watch.jsx";

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {path:'/', element:<Feed/>},
      {path:'/watch', element:<Watch/>}
    ]
  }
])


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
