import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./components/header";
import {Cardcon} from "./components/card";
import Explore from "./components/explore";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./components/error";
import { useInfinite } from "./hooks/useInfinite";

 
const MainApplayout=()=>{   
 
    return(<>
      <Header/>
        <div className="center"><Cardcon/></div>

  {/* <div className="center">  <Cardcon/></div> */}
</>
    )
}

const appRouter=createBrowserRouter([
{
  path:"/",
  element:<MainApplayout/>,
  errorElement:<Error/>
},

{
  path:"/explore",
  element:<Explore/>
},


  
])







const root=ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={appRouter}/> )