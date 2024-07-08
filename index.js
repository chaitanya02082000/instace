import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./components/header";
import { Cardcon } from "./components/card";
import Explore from "./components/explore";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./components/error";
import { useInfinite } from "./hooks/useInfinite";
import { Outlet } from "react-router-dom";
import Saved from "./components/saved";
import News from "./components/news";
const MainApplayout = () => {
  return (
    <>
       <Header /> 
      <Outlet />
      {/* <div className="center"><Cardcon/></div> */}

      {/* <div className="center">  <Cardcon/></div> */}
    </>
  );
};
 

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainApplayout  />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <div className="center"><Cardcon/></div>,
      },
     
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/saved",
        element: <Saved />,
      },
      {
        path: "/news",
        element: <News />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
