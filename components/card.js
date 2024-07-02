import React from "react";
import ReactDOM from "react-dom/client"
import { useEffect,useState } from "react";
import {api} from "../utils/constants"
 import Skeleton from "./skeleton";

export const Cardcon = () => {
  const [cards, setCards] = useState([]);
const [isLoading,setIsLoading]=useState(true)
  
  
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(api);
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // return (
  //   <div className="cards-wrapper">
  //     {isLoading
  //       ? Array(5).fill().map((_, index) => <Skeleton key={index} />)
  //       : cards.map((card, index) => (
  //           <Card key={index} cardData={card} />
  //         ))}
  //   </div>
  // );

  return (cards.map((card, index) => (
    <Card key={index} cardData={card} />
  )))
};

const Card = ({ cardData }) => {
  const { title, url, explanation } = cardData;

  const [isExpanded, setIsExpanded] = useState(false);
  const wordLimit = 30;
  const words = explanation.split(' ');
  const truncatedText = words.slice(0, wordLimit).join(' ');
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
        {isExpanded ? explanation : (
          <>
            {truncatedText}
            {isTextLong && (
              <>
                ...
                <button className="btn" onClick={handleReadMore}>Read More</button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};