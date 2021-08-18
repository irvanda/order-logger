import Cookies from 'js-cookie';
import Config from '../Utils/config';

const { get } = Cookies;

const Fetch = async (method, path, data) => {
  const token = get(`token${Config.cookieType}`);
  const baseUrl = Config.apiUrl;
  return await fetch(baseUrl + path, {
    method: method || 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    },
  });
};

export default Fetch;
