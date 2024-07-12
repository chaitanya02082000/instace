import { useCallback, useEffect, useState } from "react";

import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareIcon from "@mui/icons-material/Share";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { Button, Pagination } from "@mui/material";

const CardComponent = ({ loading, cardData, saveDates }) => {
  const { title, url, explanation, date, media_type } = cardData || {};
  const [isExpanded, setIsExpanded] = useState(false);
  const wordLimit = 15;

  const truncateText = (text) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const formatDate = (inputDate) => {
    if (!inputDate) return "";
    const date = new Date(inputDate);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
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
      <Box sx={{ position: "relative", paddingTop: "100%", overflow: "hidden" }}>
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
            src={`${url}?autoplay=1&showinfo=0&controls=1&modestbranding=1&iv_load_policy=3&loop=1&rel=0`}
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
        <IconButton aria-label="add to favorites">
          <FavoriteBorderOutlinedIcon />
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
            <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={15} width="80%" />
          </>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ display: "inline" }}>
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
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
              {formatDate(date)}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};
 

const Saved = () => {
    const [dates, setDates] = useState([]);
    const [cards10, setCards10] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5;
  
    useEffect(() => {
      const data = localStorage.getItem("test");
      if (data) {
        setDates(JSON.parse(data));
      }
    }, []);
  
    const fetchSaved = useCallback(async () => {
      if (dates.length === 0) return;
  
      setIsLoading(true);
      try {
        const promises = dates.map((date) =>
          fetch(`https://api.nasa.gov/planetary/apod?api_key=KUKIc9kkRALjcuzMs3xLM6SYBo2hNUDu5UfpIAbe&date=${date}`)
            .then((response) => response.json())
        );
        const data = await Promise.all(promises);
        setCards10((prevCards) => {
          return [...new Set([...prevCards, ...data])];
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }, [dates]);
  
    useEffect(() => {
      fetchSaved();
    }, [fetchSaved]);
  
    // Pagination logic
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };
  
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = cards10.slice(indexOfFirstArticle, indexOfLastArticle);
  
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
        {isLoading ? "Loading..." : "SAVED"}
        {currentArticles.map((card, index) => (
          <CardComponent key={index} cardData={card} saveDates={setDates} />
        ))}
        <Pagination
          count={Math.ceil(cards10.length / articlesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ mt: 2 }}
        />
      </Box>
    );
  };
  
  export default Saved;