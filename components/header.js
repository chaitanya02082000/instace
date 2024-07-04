import React from "react";
import ReactDOM from "react-dom/client"
import {useRouter} from "react-router"
import ExploreIcon from '@mui/icons-material/Explore';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
  // import ExploreIcon from '@mui/icons-material/Explore';ExploreIcon,
  

import { Link } from "react-router-dom"
export const Header=()=>{
    

    return(<>
   <div className="page-header"> 
    <div className="header-container">
        <div className="logo"><Link to="/">Instace</Link></div>
        <div className="button"><ul>
            <li><ExploreIcon  sx={{ fontSize: 30 }}/></li>
            <li><DarkModeIcon  sx={{ fontSize: 30 }}/></li>
            <li><GitHubIcon  sx={{ fontSize: 30 }}/></li></ul></div>
    </div>
    </div>
    </>)
}