// useInfinite.js
import { useState, useRef, useCallback, useEffect } from "react";
import { useGetData } from "../utils/helper";

const useInfinite = (props) => {
  const flag = props;
  const { setArticlePage,articlePage,articles,fetchArticles, isLoading, cards, fetchdataImage, getdataRSS, RSSdata,fetchdataImage10,cards10,addNewFeed } = useGetData();
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const [error, setError] = useState(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) {
        setPage((prevPage) => prevPage + 1);
        setArticlePage((prev)=>prev+1);
        setIsFetchingMore(true);
      }
    },
    [isLoading]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (flag === 1) {
          await fetchdataImage();
          console.log("Fetching Image data...");
        } else if(flag===3){
          await fetchdataImage10();
          console.log("Fetching explore data...");
          
        }else if(flag===4){
          await fetchArticles();
          console.log("Fetching Article data...");
          
        }  else {
          await getdataRSS();
          console.log("Fetching RSS data...");
          
        }
        setIsFetchingMore(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
        setIsFetchingMore(false);
      }
    };

    fetchData();
  }, [page,articlePage]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "1px",
      threshold: 1,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    } else {
      console.log("not observing");
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
        console.log("unloading the observer....");
      }
    };
  }, [handleObserver]);

  return { articles,isLoading, cards, loaderRef, RSSdata, error, isFetchingMore ,cards10};
};

export default useInfinite;
