import Config from '../Utils/config';
import { getToken } from './storage';

const Fetch = async (method, path, data) => {
  const token = getToken(`token${Config.cookieType}`);
  const baseUrl = Config.apiUrl;
  const response = await fetch(baseUrl + path, {
    method: method || 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    },
  });
  return response.json();
};

export default Fetch;
