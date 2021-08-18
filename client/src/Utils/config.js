const env = process.env.REACT_APP_ENV || 'local';

const Configs = {
  local: {
    apiUrl: 'http://localhost:5000',
    cookieType: '__local__',
  },
  prod: {
    apiUrl: 'http://localhost:5000',
    cookieType: '',
  },
};

let Config = Configs.local;
if (env === 'production') {
  Config = Configs.prod;
}

export default Config;
