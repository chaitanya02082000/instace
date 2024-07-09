import { useState, useCallback, useEffect } from "react";
import React from "react";
import { api,url } from "./constants";
import RSSParser from "rss-parser";
export const useGetData = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [RSSdata, setData] = useState([]);
  const fetchdataImage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(api);
      const data = await response.json();
      setCards((prev) => {
        return [...new Set([...prev, ...data])];
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const parser = new RSSParser({
    customFields: {
      item: [
        ['media:content', 'mediaContent',],
        ['media:description', 'mediaDescription']
      ]
    }
  });

  const getdataRSS = async () => {
    try {
      const feed = await parser.parseURL(url);
      setData(feed);
    } catch (error) {
      console.error("Error fetching RSS data:", error);
    }finally {
      setIsLoading(false);}
  };


 

  return { isLoading, cards, fetchdataImage, getdataRSS, RSSdata };
};
