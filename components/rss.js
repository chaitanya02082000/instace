import React, { useState, useRef, useEffect } from "react";
import useInfinite from "../hooks/useInfinite";
import CardSkeleton from "./CardSkeleton";
import Newsfooter from "./news-footer";
import { Outlet } from "react-router";
const Rssfeed = () => {
  const { RSSdata, isLoading } = useInfinite(0);

   

  
  return ( 
     <div className="news-container">
      
      {isLoading ?  Array(5)
      .fill()
      .map((_, index) => <CardSkeleton key={`skeleton-${index}`} />):(RSSdata.items.map((item, index) => (
        <CarD key={index} item={item} />
      )))}
      <Newsfooter/>
    </div>
     
  );
};

const CarD = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleTouchStart = () => setIsHovered(true);
    const handleTouchEnd = () => setIsHovered(false);

    card.addEventListener('touchstart', handleTouchStart);
    card.addEventListener('touchend', handleTouchEnd);

    return () => {
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleClick = () => {
    window.open(item.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
    
    <div 
      
      ref={cardRef}
      className={`News-cards ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {item.mediaContent && item.mediaContent && item.mediaContent.$ && (
        <img src={item.mediaContent.$.url} alt={item.title || "RSS image"} />
      )}
      <div className="text-content">
        <h2>{item.title}</h2>
        <p>{item.creator}</p>
        <p>{item.pubDate}</p>
      </div>
      <div className="content-snippet">
        <h2>{item.title}</h2>
        <p>{item.contentSnippet}</p>
        {item.mediaDescription && <p>{item.mediaDescription}</p>}
      </div>
    </div>
    </>
  
  );
};

export default Rssfeed;