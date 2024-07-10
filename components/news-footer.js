import React from "react";
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ArticleIcon from "@mui/icons-material/Article";

const Newsfooter = () => {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction label="RSS" icon={<RssFeedIcon />} component={Link} to="/news" />
      <BottomNavigationAction label="Forecast" icon={<WbSunnyIcon />} component={Link} to="/news/forecast" />
      <BottomNavigationAction label="Articles" icon={<ArticleIcon />} component={Link} to="/news/articles" />
    </BottomNavigation>
  );
};

export default Newsfooter;
