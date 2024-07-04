import React from "react";
import { useState } from "react";
export const useInfinite=()=>{
    const [isScroll,setIsScroll]=useState(false)
    const handleScroll = (e)=>{
        const bottom=Math.abs(element.scrollHeight - (element.scrollTop + element.clientHeight)) <= 1
        if(bottom){
            setIsScroll(true)
        }
    }
 return(
    setIsScroll
 )
    
}