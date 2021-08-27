const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../model/user');
const { TOKEN_KEY } = process.env;

const GetUser = async (req) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const decode = jwt.verify(token, TOKEN_KEY);
  const response = await User.findOne({ email: decode.email });
  const { password, ...user } = response._doc;
  return user;
};

module.exports = GetUser;
