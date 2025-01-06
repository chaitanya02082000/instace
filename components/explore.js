 import React, { useState, useCallback, useMemo } from "react";
import { Container, Box, IconButton, Typography, Skeleton } from "@mui/material";
import useInfinite from "../hooks/useInfinite";
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import Masonry from '@mui/lab/Masonry';

const ImageContainer = styled(Box)(({ theme, $aspectRatio }) => ({
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
  cursor: 'pointer',
  aspectRatio: $aspectRatio,
  backgroundColor: theme.palette.grey[200],
  '&:hover .overlay': {
    opacity: 1,
  },
  '&:hover img': {
    transform: 'scale(1.05)',
  },
}));

const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
  display: 'block',
});

const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  opacity: 0,
  transition: 'opacity 0.2s ease',
}));

const ActionButtons = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
});

// Function to generate random aspect ratio
const getRandomAspectRatio = () => {
  const ratios = [
    ['1/1', 0.3],    // Square - 30% chance
    ['4/5', 0.2],    // Portrait - 20% chance
    ['16/9', 0.2],   // Landscape - 20% chance
    ['2/3', 0.15],   // Portrait - 15% chance
    ['3/2', 0.15],   // Landscape - 15% chance
  ];

  const random = Math.random();
  let sum = 0;
  for (const [ratio, probability] of ratios) {
    sum += probability;
    if (random <= sum) return ratio;
  }
  return '1/1'; // Default fallback
};

const Explore = () => {
  const { isLoading, loaderRef, cards10, isFetchingMore } = useInfinite(3);
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Generate and memoize aspect ratios for each card
  const aspectRatios = useMemo(() => {
    return cards10.map(() => getRandomAspectRatio());
  }, [cards10.length]);

  const handleImageLoad = useCallback((id) => {
    setLoadedImages(prev => new Set(prev).add(id));
  }, []);

  const handleShare = useCallback(async (card, e) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: card.title,
          text: card.explanation,
          url: card.url,
        });
      } else {
        await navigator.clipboard.writeText(card.url);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }, []);

  const handleDownload = useCallback(async (card, e) => {
    e.stopPropagation();
    try {
      const response = await fetch(card.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${card.title || 'nasa-image'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading:', error);
    }
  }, []);

  const masonryItems = useMemo(() => {
    if (!cards10.length && isLoading) {
      return Array(12).fill().map((_, index) => (
        <Box
          key={`skeleton-${index}`}
          sx={{
            aspectRatio: getRandomAspectRatio(),
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
          />
        </Box>
      ));
    }

    return cards10.map((card, index) => (
      <ImageContainer 
        key={card.date || index}
        $aspectRatio={aspectRatios[index]}
      >
        {card.media_type === "video" ? (
          <Box sx={{ height: '100%', backgroundColor: 'black' }}>
            <iframe
              src={`${card.url}?autoplay=0&controls=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
        ) : (
          <>
            <Image
              alt={card.title}
              src={card.url}
              loading="lazy"
              onLoad={() => handleImageLoad(index)}
              style={{
                opacity: loadedImages.has(index) ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />
            <Overlay className="overlay">
              <Typography
                variant="subtitle1"
                color="white"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                }}
              >
                {card.title}
              </Typography>
              <ActionButtons>
                <IconButton
                  size="small"
                  sx={{ 
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ 
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                  }}
                  onClick={(e) => handleShare(card, e)}
                >
                  <ShareIcon />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ 
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                  }}
                  onClick={(e) => handleDownload(card, e)}
                >
                  <DownloadIcon />
                </IconButton>
              </ActionButtons>
            </Overlay>
          </>
        )}
      </ImageContainer>
    ));
  }, [cards10, aspectRatios, loadedImages, handleImageLoad, handleShare, handleDownload]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        minHeight: '100vh',
      }}
    >
      <Masonry
        columns={{ xs: 2, sm: 3, md: 4, lg: 5 }}
        spacing={2}
        sx={{ margin: 0 }}
      >
        {masonryItems}
      </Masonry>
      
      {isFetchingMore && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
              lg: 'repeat(5, 1fr)',
            },
            gap: 2,
            mt: 2,
          }}
        >
          {Array(5).fill().map((_, index) => (
            <Box
              key={`loading-${index}`}
              sx={{
                aspectRatio: getRandomAspectRatio(),
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              />
            </Box>
          ))}
        </Box>
      )}
      <div ref={loaderRef} />
    </Container>
  );
};
export default Explore;
