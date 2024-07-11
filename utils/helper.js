import { useState, useCallback, useEffect } from "react";
import React from "react";
import { api, url, api10, articlesURL } from "./constants";
import RSSParser from "rss-parser";
export const useGetData = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [RSSdata, setData] = useState([]);
  const [cards10, setCards10] = useState([]);
  const [articles,setArticles]=useState([])
  const [articlePage,setArticlePage]=useState(0);
  const thing = "https://thingproxy.freeboard.io/fetch/";
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
  const fetchdataImage10 = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(api10);
      const data = await response.json();
      setCards10((prev) => {
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
        ["media:content", "mediaContent"],
        ["media:description", "mediaDescription"],
        ["media:thumbnail", "mediaThumbnail"],
      ],
    },
  });

  const getdataRSS = async () => {
    try {
      const URL = `${thing}https://telescoper.blog/feed/`;

      const feed = await parser.parseURL(url);
      console.log(feed);
      setData(feed);
    } catch (error) {
      console.error("Error fetching RSS data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //https://www.theguardian.com/science/space/rss
  //bbc https://thingproxy.freeboard.io/fetch/https://feeds.bbci.co.uk/news/science_and_environment/rss.xml
  ////whole post https://www.space.com/feeds/all
  ///https://follow.it/centauri-dreams-imagining-and-planning-interstellar-exploration/rss

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${articlesURL}${articlePage}`);
      const feed= await response.json()
      const data=await feed.response.docs
       setArticles((prev) => {
        return [...new Set([...prev, ...data])];
      });
    } catch (error) {
      console.error("Error fetching Articles data:", error);
    } finally {
      setIsLoading(false);
    }
  };
   
  return {
    isLoading,
    cards,
    fetchdataImage,
    getdataRSS,
    RSSdata,
    cards10,
    fetchdataImage10,
    fetchArticles,
    articles,
    articlePage,
    setArticlePage
  };
};
