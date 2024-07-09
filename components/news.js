import React, { useState, useRef, useEffect } from "react";
import useInfinite from "../hooks/useInfinite";
import CardSkeleton from "./CardSkeleton";
import Newsfooter from "./news-footer";
import { Outlet } from "react-router";
const News = () => {
  

   


  return ( <>
    <Outlet/>
      <Newsfooter/>
 
     </>
  );
};
 

export default News;