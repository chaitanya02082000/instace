import React from "react";
import ReactDOM from "react-dom/client"
// import {useRouter} from "react-router"

export const Header=()=>{
    

    return(<>
    <div className="header-container">
        <div className="logo">Spacetagram</div>
        <div className="button"><ul>
            <li>Explore</li>
            <li><button>Switch</button></li>
            <li>github</li></ul></div>
    </div>
    
    </>)
}