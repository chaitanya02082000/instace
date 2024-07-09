import React from "react";
 import { Link } from "react-router-dom";
const Newsfooter = () => {
  return (
    <div className="news-footer">
      <ul>
        <li>
          <button className="tab-button"><Link to="/news">RSS</Link></button>
        </li>
        <li>
          <button className="tab-button"><Link to="/news/forecast"> Forecast</Link></button>
        </li>
        <li>
          <button className="tab-button"><Link to="/news/articles">Articles</Link></button>
        </li>
      </ul>
    </div>
  );
};

export default Newsfooter;
