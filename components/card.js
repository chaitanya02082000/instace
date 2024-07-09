import React, { useState } from "react";
import Skeleton from "./skeleton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareIcon from "@mui/icons-material/Share";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import useInfinite from "../hooks/useInfinite";
import CardSkeleton from "../components/CardSkeleton";
export const Cardcon = () => {
  const { isLoading, cards, loaderRef, isFetchingMore } = useInfinite(1);

  return (
    <div className="cards-wrapper">
      {isLoading
        ? Array(5)
            .fill()
            .map((_, index) => <CardSkeleton key={index} />)
        : cards.map((card, index) => <Card key={index} cardData={card} />)}
      {isFetchingMore &&
        Array(5)
          .fill()
          .map((_, index) => <CardSkeleton key={`skeleton-${index}`} />)}
      <div ref={loaderRef}> </div>
    </div>
  );
};


const Card = ({ cardData }) => {
  const { title, url, explanation, date, media_type } = cardData;

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
        {media_type === "video" ? (
          <iframe
            className="iframe"
            src={
              url +
              "autoplay=1&showinfo=0&controls=1&modestbranding=1&iv_load_policy=3&loop=1&rel=0"
            }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : (
          <img alt="not rendering" src={url} />
        )}
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
        <div className="date"> {formatDate(date)} </div>
      </div>
    </div>
  );
};

