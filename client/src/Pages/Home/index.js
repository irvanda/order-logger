import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import './index.css';
import Login from '../../Components/Login';
import Order from '../../Components/Order';
import { getToken } from '../../Utils/storage';
import Api from '../../Api';

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

const IsLoggedin = async () => {
  const token = getToken();
  if (token) {
    const res = await Api.Auth.GetUser();
    if (res.success) return true;
    return false;
  }
  return false;
};

const Home = () => {
  const [isLoggedin, setIsloggedin] = React.useState(false);
  React.useEffect(() => {
    async function init() {
      const res = await IsLoggedin();
      setIsloggedin(res);
    }
    init();
  }, []);
  return (
    <ThemeProvider theme={myTheme}>
      <Container maxWidth="sm" className="box-shadow layout">
        {isLoggedin ? <Order setIsLoggedin={setIsloggedin} /> : <Login setIsLoggedin={setIsloggedin} />}
      </Container>
    </ThemeProvider>
  );
};

export default Home;
