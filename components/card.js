import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState, useRef, useCallback } from "react";
import { api } from "../utils/constants";
import Skeleton from "./skeleton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useInfinite } from "../hooks/useInfinite";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { useGetData } from "../utils/helper";
import useInfinite from "../hooks/useInfinite";
export const Cardcon = () => {
  const { isLoading, cards, loaderRef } = useInfinite();
  // const [page, setPage] = useState(1);
  // useEffect(() => {
  //   fetchdata();
  //   console.log("ueseffectFetchdata PAge");
  // }, []);
  
  // const handleScroll = useCallback(() => {
      
       
  //    if (window.innerHeight + window.scrollY >= window.offsetHeight) {
  //      console.log("fucntionHandlescroll fetchiunf data");
  //     //  setPage((prevPage) => prevPage + 1);
  //      fetchdata()
  //    }})
   
   
  // useEffect(() => {
    
  //   window.addEventListener("scroll", handleScroll);
  //   console.log("EventelisteneerUsefefect");
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

//  IMPLEMENTING THE SCORLLING IMPLEMENTAION


 

  return (
    <div className="cards-wrapper"     >  
      {cards.length
        ? (cards.map((card, index) =>  <Card key={index} cardData={card} /> ))
        : isLoading &&
          Array(5)
            .fill()
            .map((_, index) => <Skeleton key={index} />)}
            <div ref={loaderRef}> </div>
    </div>
  );
};

const Card = ({ cardData }) => {

  
  const { title, url, explanation, date ,media_type} = cardData;
   
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }

  const [isExpanded, setIsExpanded] = useState(false);
  const wordLimit = 15;
  const words = explanation.split(" ");
  const truncatedText = words.slice(0, wordLimit).join(" ");
  const isTextLong = words.length > wordLimit;
  const handleReadMore = () => {
    setIsExpanded(true);
  };
  return (
    <div className="card-container">
      <div className="card-header">{title}</div>
      <div className="image">
         
   {/* <iframe className="iframe" src="https://www.youtube.com/embed/fLAFCDq2mPU?"  allowfullscreen frameborder="0" allow="autoplay; fullscreen" alt="video not rendering"  /> */}
       {media_type=='video'?(<iframe className="iframe" src={url+"autoplay=1&showinfo=0&controls=1&modestbranding=1&iv_load_policy=3&loop=1&rel=0"} frameborder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>):<img alt="not rendering" src={url}  /> } 

      </div>
      <div className="card-footer">
        <div className="footer-btn">
          <div className="like">
            <FavoriteBorderOutlinedIcon />
          </div>
          <div className="share">
            <ShareIcon />
          </div>
          <div className="save">
            <TurnedInNotIcon sx={{ fontSize: 26 }} />
          </div>
        </div>
        <div className="footer-text">
          {isExpanded ? (
            explanation
          ) : (
            <>
              {truncatedText}
              {isTextLong && (
                <>
                  ...
                  <button className="btn" onClick={handleReadMore}>
                    more
                  </button>
                </>
              )}
            </>
          )}
        </div>
        <div className="date" > {formatDate(date)} </div>
      </div>
    </div>
  );
};
