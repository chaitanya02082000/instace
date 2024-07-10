import React from "react";
import { Grid, Container, Box } from "@mui/material";
import useInfinite from "../hooks/useInfinite";
import Skeleton from "../components/skeleton";

const Explore = () => {
  const { isLoading, loaderRef, cards10, isFetchingMore } = useInfinite(3);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {cards10.length
          ? cards10.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 2,
                  }}
                >
                  {card.media_type === "video" ? (
                    <iframe
                      src={`${card.url}?autoplay=1&showinfo=0&controls=1&modestbranding=1&iv_load_policy=3&loop=1&rel=0`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ width: "100%", height: "100%" }}
                    ></iframe>
                  ) : (
                    <img alt="Pin content" src={card.url} loading="lazy" style={{ width: "100%", height: "100%" }} />
                  )}
                </Box>
              </Grid>
            ))
          : isLoading &&
            Array(5)
              .fill()
              .map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Skeleton key={index} variant="rect" height={200} />
                </Grid>
              ))}
        {isFetchingMore &&
          Array(5)
            .fill()
            .map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={`skeleton-${index}`}>
                <Skeleton key={`skeleton-${index}`} variant="rect" height={200} />
              </Grid>
            ))}
      </Grid>
      <div ref={loaderRef}></div>
    </Container>
  );
};

export default Explore;
