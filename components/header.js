import React from "react";
import ReactDOM from "react-dom/client";
import { useRouter } from "react-router";
import ExploreIcon from "@mui/icons-material/Explore";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GitHubIcon from "@mui/icons-material/GitHub";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <>
      <div className="page-header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">Instace</Link>
          </div>
          <div className="button">
            <ul>
              <li>
                <Link to="/explore">
                  <ExploreIcon sx={{ fontSize: 30 }} />
                </Link>
              </li>
              <li>
                <DarkModeIcon sx={{ fontSize: 30 }} />
              </li>
              <li>
               <Link to="/saved"><BookmarksIcon sx={{ fontSize: 30 }} /></Link> 
              </li>
              <li>
                <Link to="/news"><RssFeedIcon sx={{ fontSize: 30 }}/></Link>
              </li>
              <li>
                <Link
                  to="https://github.com/chaitanya02082000/instace"
                  target="_blank"
                >
                  <GitHubIcon sx={{ fontSize: 30 }} />
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
