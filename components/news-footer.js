import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RssFeedIcon from "@mui/icons-material/RssFeed";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ArticleIcon from "@mui/icons-material/Article";
import AddIcon from "@mui/icons-material/Add";
import { useGetData } from "../utils/helper";

const Newsfooter = () => {
  const [value, setValue] = useState(0);
 
  const ref = useRef(null);

   
  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);

  return (
    <Box sx={{ pb: 20 }} ref={ref}>
      
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="RSS" icon={<RssFeedIcon />} component={Link} to="/news" />
          <BottomNavigationAction label="Forecast" icon={<WbSunnyIcon />} component={Link} to="/news/forecast" />
          <BottomNavigationAction label="Articles" icon={<ArticleIcon />} component={Link} to="/news/articles" />
        </BottomNavigation>
        
      </Paper>
    </Box>
  );
};

export default Newsfooter;