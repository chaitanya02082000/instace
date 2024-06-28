import React from "react";
import ReactDOM from "react-dom/client"


export const Card=()=>{


    return(
        <>
        <div className="card-container">
            <div className="card-header">Header</div>
            <div className="image"><img alt="not rendering" src="https://apod.nasa.gov/apod/image/2406/STScI-SerpNorth1024.png"></img></div>
            <div className="card-footer">Footer</div>
        </div>
        </>
    )

}