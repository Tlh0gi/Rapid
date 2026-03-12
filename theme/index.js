'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFD700',
      light: '#FFE566',
      dark: '#B8980A',
    },
    secondary: {
      main: '#00BFFF',
      light: '#66D9FF',
      dark: '#007A99',
    },
    background: {
      default: '#020B18',
      paper: '#051A30',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#FFD700',
    },
    error: {
      main: '#FF4444',
    },
    success: {
      main: '#00E676',
    },
  },
  typography: {
    fontFamily: "'Cinzel', serif",
    h1: { fontFamily: "'Cinzel Decorative', cursive", fontWeight: 900 },
    h2: { fontFamily: "'Cinzel Decorative', cursive", fontWeight: 700 },
    h3: { fontFamily: "'Cinzel', serif", fontWeight: 700 },
    h4: { fontFamily: "'Cinzel', serif", fontWeight: 600 },
    h5: { fontFamily: "'Cinzel', serif", fontWeight: 600 },
    h6: { fontFamily: "'Cinzel', serif", fontWeight: 500 },
    body1: { fontFamily: "'Lato', sans-serif", fontWeight: 400 },
    body2: { fontFamily: "'Lato', sans-serif", fontWeight: 300 },
    button: { fontFamily: "'Cinzel', serif", fontWeight: 600, letterSpacing: '0.08em' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #020B18 0%, #051A30 50%, #020B18 100%)',
          minHeight: '100vh',
        },
      },
    },
  },
});

export default theme;