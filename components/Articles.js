import React, { useState } from 'react';
import useInfinite from "../hooks/useInfinite";
import { Card, CardMedia, Typography, Box, Link } from "@mui/material"; // Added Link

const Articles = () => {
  const { articles, loaderRef } = useInfinite(4);

  return (
    <Box className="app">
      <Typography variant="h2" component="h1" gutterBottom>
        Articles
      </Typography>
      <ArticlesList articles={articles} />
      <div ref={loaderRef} />
    </Box>
  );
};

const ArticlesList = ({ articles }) => {
  return (
    <Box 
      className="articles-list" 
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
      }}
    >
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </Box>
  );
};

const ArticleCard = ({ article }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    // Open in new tab
    window.open(article.web_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card 
      component={Link} // Make the Card a link
      href={article.web_url}
      onClick={handleClick}
      sx={{ 
        position: 'relative',
        height: '400px',
        overflow: 'hidden',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          textDecoration: 'none', // Remove default link underline
        },
        cursor: 'pointer',
        textDecoration: 'none', // Remove default link underline
      }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <CardMedia
        component="img"
        image={article.multimedia[3]?.url 
          ? `https://static01.nyt.com/${article.multimedia[3].url}`
          : 'https://via.placeholder.com/300x200?text=No+Image'} // Added fallback image
        alt={article.headline.main}
        sx={{
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '1rem',
          transform: isActive ? 'translateY(100%)' : 'translateY(0)',
          transition: 'transform 0.3s',
        }}
      >
        <Typography variant="h6" component="div" gutterBottom>
          {article.headline.main}
        </Typography>
        <Typography variant="body2">
          {article.abstract}
        </Typography>
      </Box>
      {isActive && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '1rem',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            {article.headline.main}
          </Typography>
          <Typography variant="body2">
            {article.lead_paragraph}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 2,
              color: '#90caf9',
              '&:hover': {
                textDecoration: 'underline',
              }
            }}
          >
            Click to read more →
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default Articles;
