import React from "react";
import ReactDOM from "react-dom/client"
import { useEffect,useState } from "react";
import {api} from "../utils/constants"
 import Skeleton from "./skeleton";
 import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
 import FavoriteIcon from '@mui/icons-material/Favorite';
 import ShareIcon from '@mui/icons-material/Share';

 const Datene=(props)=>{
  const date= props;
  const givenDate= new Date(date);
  const formattedDate = `${givenDate.getMonth() + 1}/${givenDate.getDate()}/${givenDate.getFullYear()}`;
 return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );

}

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
  return (
    <div className="cards-wrapper">
      {isLoading
        ? Array(5).fill().map((_, index) => <Skeleton key={index} />)
        : cards.map((card, index) => (
            <Card key={index} cardData={card} />
          ))}
    </div>
  );
};
 
const Card = ({ cardData }) => {
  const { title, url, explanation,date } = cardData;

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
        <div className="footer-btn">
          <div className="like"><FavoriteBorderOutlinedIcon/></div>
          <div className="share"><ShareIcon/></div>
        </div>
        {isExpanded ? explanation : (
          <>
            {truncatedText}
            {isTextLong && (
              <>
                ...
                <button className="btn" onClick={handleReadMore}>More</button>
              </>
            )}
          </>
        )}
        <div className="date"><Datene props={date}/></div>
      </div>
    </div>
  );
};