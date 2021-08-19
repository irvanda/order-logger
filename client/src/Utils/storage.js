import Cookies from 'js-cookie';
import Config from './config';

const { set, get, remove } = Cookies;

const setToken = (token) => {
  set(`token${Config.cookieType}`, JSON.stringify(token));
};

const getToken = () => {
  const token = get(`token${Config.cookieType}`);
  return token && JSON.parse(token);
};

const removeToken = () => {
  remove(`token${Config.cookieType}`);
};

export { setToken, getToken, removeToken };
