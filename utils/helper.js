import { useState, useCallback } from "react";
import React from "react";
import { api } from "./constants";
export const useGetData = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchdata = async () => {
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

  return { isLoading, cards, fetchdata };
};
