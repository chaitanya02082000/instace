import React from "react";
import ReactDOM from "react-dom/client"
import {useRouter} from "react-router"

  // import ExploreIcon from '@mui/icons-material/Explore';ExploreIcon,
  

import { Link } from "react-router-dom"
export const Header=()=>{
    

    return(<>
   <div className="page-header"> 
    <div className="header-container">
        <div className="logo">Spacetagram</div>
        <div className="button"><ul>
            <li>Explore</li>
            <li><button>Switch</button></li>
            <li>github</li></ul></div>
    </div>
    </div>
    </>)
}