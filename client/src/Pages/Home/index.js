import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import './index.css';
import Login from '../../Components/Login';

const myTheme = createTheme({
  typography: {},
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    textPrimary: {
      main: '#fff',
    },
  },
});

const Home = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <Container maxWidth="sm" className="box-shadow layout">
        <Login />
      </Container>
    </ThemeProvider>
  );
};

export default Home;
