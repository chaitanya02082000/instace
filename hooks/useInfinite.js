 
import { useState,useRef,useCallback, useEffect } from "react";
import { useGetData } from "../utils/helper";
 
const useInfinite=()=>{
    const {isLoading,cards,fetchdata}= useGetData();
    const [page, setPage] = useState(1);
    const loaderRef = useRef([]);
  const handleObserver=useCallback((entries)=>{
    const target = entries[0];
    if(target.isIntersecting && !isLoading){
        setPage((prevPage)=>prevPage+1);
    }

  },[setPage,isLoading])

 
useEffect(()=>{
    fetchdata();
    console.log('fetchind data.....')
},[page])

useEffect(()=>{
    const option = {
        root: null,
        rootMargin: "500px",
        threshold: 1
}
const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return()=>{
        if (loaderRef.current) observer.unobserve(loaderRef.current);
        console.log("unloading the observer....")
    };
  }, [handleObserver]);
 

return { isLoading, cards, loaderRef }
}

export default useInfinite;