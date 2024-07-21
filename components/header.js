// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Box, useTheme, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import ExploreIcon from "@mui/icons-material/Explore";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import RssFeedIcon from '@mui/icons-material/RssFeed';

const HeaderWrapper = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#262626' : '#dbdbdb'}`,
  top: 0,
  zIndex: 2000,
  height: 60,
}));

const HeaderContent = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: '60px',
  padding: 0,
});

const Logo = styled(Typography)({
  fontFamily: "'Cookie', cursive",
  fontWeight: 500,
  fontSize: '32px',
  color: "inherit",
  textDecoration: "none",
});

const IconContainer = styled(Box)({
  display: 'flex',
  gap: '5px',  // Reduced gap to make icons closer
  alignItems: 'center',
});

const StyledIconButton = styled(IconButton)({
  padding: '5px',
  color: 'inherit', // Ensuring icons are black
});

export const Header = ({ toggleMode }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <HeaderWrapper position="fixed">
      <Container maxWidth="md">
        <HeaderContent>
          <Logo component={Link} to="/">
            Instace
          </Logo>
          <IconContainer>
            <StyledIconButton component={Link} to="/explore">
              <ExploreIcon fontSize="medium" />
            </StyledIconButton>
            <StyledIconButton component={Link} to="/saved">
              <BookmarksIcon fontSize="medium" />
            </StyledIconButton>
            <StyledIconButton component={Link} to="/news">
              <RssFeedIcon fontSize="medium" />
            </StyledIconButton>
            <StyledIconButton onClick={toggleMode} aria-label="Toggle dark mode">
              {mode === "dark" ? <LightModeOutlinedIcon fontSize="medium" /> : <DarkModeOutlinedIcon fontSize="medium" />}
            </StyledIconButton>
            <StyledIconButton
              component="a"
              href="https://github.com/chaitanya02082000/instace"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon fontSize="medium" />
            </StyledIconButton>
          </IconContainer>
        </HeaderContent>
      </Container>
    </HeaderWrapper>
  );
};
