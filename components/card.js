import React, { useCallback, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import Button from "@mui/material/Button";
import useInfinite from "../hooks/useInfinite";
import { keyframes } from "@mui/system";
const CardComponent = ({ loading, cardData, saveDates }) => {
  const { title, url, explanation, date, media_type } = cardData || {};
  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const wordLimit = 15;
  const likeAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

  function formatDate(inputDate) {
    if (!inputDate) return "";
    const date = new Date(inputDate);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }

  const truncateText = (text) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const handleLike = () => {
    setAnimating(true);
    setLiked((prev) => !prev);
    setTimeout(() => setAnimating(false), 300); // Duration of the animation
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 470,
        mb: 2,
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        borderRadius: "3px",
      }}
    >
      <CardHeader
        sx={{ py: 1 }}
        title={
          loading ? (
            <Skeleton animation="wave" height={20} width="60%" />
          ) : (
            <Typography variant="subtitle1">{title}</Typography>
          )
        }
      />
      <Box
        sx={{ position: "relative", paddingTop: "100%", overflow: "hidden" }}
      >
        {loading ? (
          <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        ) : media_type === "video" ? (
          <CardMedia
            component="iframe"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            src={
              url +
              "autoplay=1&showinfo=0&controls=1&modestbranding=1&iv_load_policy=3&loop=1&rel=0"
            }
            allowFullScreen
          />
        ) : (
          <CardMedia
            component="img"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            image={url}
            alt={title}
          />
        )}
      </Box>
      <CardActions disableSpacing sx={{ pb: 0 }}>
      <IconButton
  aria-label="add to favorites"
  onClick={handleLike}
  sx={{
    animation: liked ? `${likeAnimation} 0.3s ease-in-out` : "none",
  }}
>
  {liked ? (
    <FavoriteIcon sx={{ color: "red" }} />
  ) : (
    <FavoriteBorderOutlinedIcon />
  )}
</IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="save" onClick={() => saveDates(date)}>
          <TurnedInNotIcon />
        </IconButton>
      </CardActions>
      <CardContent sx={{ pt: 1, pb: 2 }}>
        {loading ? (
          <>
            <Skeleton
              animation="wave"
              height={15}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={15} width="80%" />
          </>
        ) : (
          <>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "inline" }}
            >
              {isExpanded ? explanation : truncateText(explanation)}
              {!isExpanded && explanation.split(" ").length > wordLimit && (
                <Button
                  size="small"
                  onClick={() => setIsExpanded(true)}
                  sx={{
                    ml: 0.5,
                    textTransform: "none",
                    p: 0,
                    minWidth: "auto",
                    fontWeight: "normal",
                    color: "text.secondary",
                    fontSize: "inherit",
                    "&:hover": {
                      background: "none",
                      textDecoration: "underline",
                    },
                  }}
                >
                  more
                </Button>
              )}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 1 }}
            >
              {formatDate(date)}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const Cardcon = () => {
  const { isLoading, cards, loaderRef, isFetchingMore } = useInfinite(1);
  const [dates, setDates] = useState(() => {
    const storedDates = localStorage.getItem("test");
    return storedDates ? JSON.parse(storedDates) : [];
  });

  const saveDates = useCallback((prop) => {
    setDates((prevDates) => {
      const newDates = [...prevDates, prop];
      console.log("Updated dates:", newDates);
      return newDates;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("test", JSON.stringify(dates));
    console.log(JSON.parse(localStorage.getItem("test")));
  }, [dates]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 470,
        mx: "auto",
      }}
    >
      {isLoading && !cards.length ? (
        Array(5).fill().map((_, index) => (
          <CardComponent key={`initial-skeleton-${index}`} loading />
        ))
      ) : (
        cards.map((card, index) => (
          <CardComponent key={index} cardData={card} saveDates={saveDates} />
        ))
      )}
      {isFetchingMore &&
        Array(5).fill().map((_, index) => (
          <CardComponent key={`more-skeleton-${index}`} loading />
        ))}
      <div ref={loaderRef}></div>
    </Box>
  );
};
