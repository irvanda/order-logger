import fetch from '../Utils/fetch';

const Login = async (data) => {
  return await fetch('POST', '/auth/login', data);
};

export default { Login };
