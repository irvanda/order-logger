import fetch from '../Utils/fetch';

const Login = async (data) => {
  return await fetch('POST', '/auth/login', data);
};

const GetUser = async () => {
  return await fetch('GET', '/auth/user');
};

const Auth = {
  Login,
  GetUser,
};

export default Auth;
