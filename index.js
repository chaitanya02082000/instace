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
import Newsfooter from "./components/news-footer";
import Articles from "./components/Articles.js";
import Forecast from "./components/forecast";
import Rssfeed from "./components/rss.js";
 


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
        children:[
          {
            path: "/news",
            
            element: <Rssfeed/>,
          },
          {
            path: "/news/articles",
            element: <Articles/>,
          },
          {
            path: "/news/forecast",
            element: <Forecast/>,
          },
        ]
         
      },
       
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
