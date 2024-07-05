import React from "react";
import { useGetData } from "../utils/helper";
import useInfinite from "../hooks/useInfinite";
import { useGetData } from "../utils/helper";
import Skeleton from "./skeleton";
const Explore = () => {
  const { isLoading, loaderRef, cards } = useInfinite();
  return (
    <div className="explore-card-container">
      {cards.length
        ? cards.map((card, index) => <Card key={index} cardData={card} />)
        : isLoading&& 
        Array(5).fill().map((_,index)=>(
            <Skeleton key={index}/>
        ))}
      <div ref={loaderRef}></div>
    </div>
  );
};

const Card = ({ cardData }) => {
  const { url } = cardData;
  return (
     
    <div className="explore-image">
    <img src={url} alt="explore content" />
  </div>
    
  );
};

export default Explore;
