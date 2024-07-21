import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './components/theme.js'; // Make sure to create this file as shown in the previous message
import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createTheme from './components/theme';
import { useDarkMode } from './hooks/useDarkMode';
import { Header } from "./components/header";
import { Cardcon } from "./components/card";
import Explore from "./components/explore";
import Error from "./components/error";
import Saved from "./components/saved";
import News from "./components/news";
import Articles from "./components/Articles.js";
import Forecast from "./components/forecast";
import Rssfeed from "./components/rss.js";
import { Outlet } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createTheme from './components/theme';
import { useDarkMode } from './hooks/useDarkMode';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/400.css';
import '@fontsource/cookie/400.css';

const App = () => {
  const [mode, toggleMode] = useDarkMode();
  const theme = useMemo(() => createTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={appRouter(toggleMode)} />
    </ThemeProvider>
  );
};

const MainAppLayout = ({ toggleMode }) => {
  return (
    <>
      <Header toggleMode={toggleMode} />
      <Outlet />
    </>
  );
};

const appRouter = (toggleMode) => createBrowserRouter([
  {
    path: "/",
    element: <MainAppLayout toggleMode={toggleMode} />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <div className="center" style={{marginTop:"20px"}}><Cardcon/></div>,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/saved",
        element: <Saved />,
      },
      {
        path: "/news",
        element: <News />,
        children:[
          {
            path: "/news",
            element: <Rssfeed/>,
          },
          {
            path: "/news/articles",
            element: <Articles/>,
          },
          {
            path: "/news/forecast",
            element: <Forecast/>,
          },
        ]
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;