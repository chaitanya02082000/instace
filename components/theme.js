import { createTheme } from '@mui/material/styles';

const theme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode palette inspired by Instagram
          background: {
            default: '#fafafa', // Instagram's light background color
            paper: '#ffffff',
          },
          text: {
            primary: '#262626', // Darker text color for better readability
            secondary: '#8e8e8e', // Lighter gray for secondary text
          },
          divider: '#dbdbdb', // Light gray for borders and dividers
        }
      : {
          // Dark mode palette
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
          },
          divider: '#333333',
        }),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url("https://fonts.googleapis.com/css2?family=Cookie&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");
        
        body {
          padding-top: 54px;
          background-color: ${mode === 'light' ? '#fafafa' : '#121212'};
          color: ${mode === 'light' ? '#262626' : '#ffffff'};
        }
        a {
          text-decoration: none;
          color: inherit;
        }
        .center {
          justify-content: center;
          display: flex;
        }
        .card-container {
          background: #fff;
          border: 1px solid #dbdbdb; // Instagram-like border color
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12); // Subtle shadow
          border-radius: 8px; // Slightly rounded corners
          margin-bottom: 60px;
        }
        .card-container > .card-header {
          padding: 16px;
          font-family: "Roboto", sans-serif;
          font-weight: 600;
          font-size: large;
          color: #262626;
        }
        .card-container > .card-footer {
          padding: 10px;
          font-family: "Poppins", sans-serif;
          font-weight: light;
          font-size: small;
          color: #8e8e8e; // Lighter text for secondary information
        }
        .btn {
          border: none;
          background: none;
          padding: 7px;
          cursor: pointer;
          color: grey;
        }
        .footer-btn > div:hover {
          color: #777;
        }
        .date {
          font-size: small;
          font-weight: lighter;
          padding: 10px;
          color: #8e8e8e; // Matching Instagram's secondary text color
        }
      `,
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
  },
});

export default theme;
