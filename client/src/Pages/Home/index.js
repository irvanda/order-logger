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
      light: '#ffffff',
      main: '#fafafa',
      dark: '#f0f0f0',
      contrastText: '#3f50b5',
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
  const [productItems, setProductItems] = React.useState(undefined);
  React.useEffect(() => {
    async function init() {
      const res = await IsLoggedin();
      setIsloggedin(res);
    }
    init();
  }, []);
  React.useEffect(() => {
    async function init() {
      const res = await Api.ProductItems.GetList(0);
      setProductItems(res.data);
    }
    if (isLoggedin && !productItems) {
      init();
    }
  }, [isLoggedin, productItems]);
  return (
    <ThemeProvider theme={myTheme}>
      <Container maxWidth="sm" className="box-shadow layout">
        {isLoggedin ? (
          <Order setIsLoggedin={setIsloggedin} productItems={productItems} />
        ) : (
          <Login setIsLoggedin={setIsloggedin} />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Home;
