import React, { useState, useRef, useEffect } from "react";
import useInfinite from "../hooks/useInfinite";
import { Card, CardContent, CardMedia, Typography, Grid, Container, CircularProgress } from "@mui/material";
import Newsfooter from "./news-footer";

const Rssfeed = () => {
  const { RSSdata, isLoading } = useInfinite(0);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {isLoading ? (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        ) : (
          RSSdata.items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CarD item={item} />
            </Grid>
          ))
        )}
      </Grid>
      
    </Container>
  );
};

const CarD = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleTouchStart = () => setIsHovered(true);
    const handleTouchEnd = () => setIsHovered(false);

    card.addEventListener("touchstart", handleTouchStart);
    card.addEventListener("touchend", handleTouchEnd);

    return () => {
      card.removeEventListener("touchstart", handleTouchStart);
      card.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleClick = () => {
    window.open(item.link, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        transition: "transform 0.3s",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
      }}
    >
      {item?.mediaContent?.$?.url && (
  <CardMedia
    component="img"
    height="140"
    image={item.mediaContent.$.url}
    alt={item.title ?? "RSS image"}
  />
)} {item?.mediaThumbnail?.$?.url && (
  <CardMedia
    component="img"
    height="140"
    image={item.mediaThumbnail.$.url}
    alt={item.title ?? "RSS image"}
  />
)}


       
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.creator}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.pubDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.contentSnippet}
        </Typography>
        {item.mediaDescription && (
          <Typography variant="body2" color="text.secondary">
            {item.mediaDescription}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Rssfeed;
