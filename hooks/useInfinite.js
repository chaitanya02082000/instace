// useInfinite.js
import { useState, useRef, useCallback, useEffect } from "react";
import { useGetData } from "../utils/helper";

const useInfinite = (props) => {
  const flag = props;
  const { isLoading, cards, fetchdataImage, getdataRSS, RSSdata } = useGetData();
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const [error, setError] = useState(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) {
        setPage((prevPage) => prevPage + 1);
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
        } else {
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
  }, [page]);

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

  return { isLoading, cards, loaderRef, RSSdata, error, isFetchingMore };
};

export default useInfinite;
