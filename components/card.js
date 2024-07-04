import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState, useRef } from "react";
import { api } from "../utils/constants";
import Skeleton from "./skeleton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useInfinite } from "../hooks/useInfinite";

export const Cardcon = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 10
    ) {
      console.log("hello");
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
     
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const getData = async () => {
    try {
      const response = await fetch(api);
      const data = await response.json();
      setCards((prevCards) => [...prevCards, ...data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="cards-wrapper">
      {isLoading
        ? Array(5)
            .fill()
            .map((_, index) => <Skeleton key={index} />)
        : cards.map((card, index) => <Card key={index} cardData={card} />)}
    </div>
  );
};

const Card = ({ cardData }) => {
  const { title, url, explanation, date } = cardData;

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
        <img alt="NASA APOD" src={url} />
      </div>
      <div className="card-footer">
        <div className="footer-btn">
          <div className="like">
            <FavoriteBorderOutlinedIcon />
          </div>
          <div className="share">
            <ShareIcon />
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
