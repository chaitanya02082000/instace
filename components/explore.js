// Explore.js
import React from "react";
import useInfinite from "../hooks/useInfinite";
import Skeleton from "../components/skeleton";

const Explore = () => {
  const { isLoading, loaderRef, cards, isFetchingMore } = useInfinite(1);

  return (
    <div className="explore-container">
      <div className="pins-grid">
        {cards.length
          ? cards.map((card, index) => (
              <div key={index} className="pin">
                {card.media_type === "video" ? (
                  <iframe
                    src={`${card.url}?autoplay=1&showinfo=0&controls=1&modestbranding=1&iv_load_policy=3&loop=1&rel=0`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img alt="Pin content" src={card.url} loading="lazy" />
                )}
              </div>
            ))
          : isLoading &&
            Array(5)
              .fill()
              .map((_, index) => <Skeleton key={index} />)}
        {isFetchingMore &&
          Array(5)
            .fill()
            .map((_, index) => <Skeleton key={`skeleton-${index}`} />)}
      </div>
      <div ref={loaderRef}></div>
    </div>
  );
};

export default Explore;
