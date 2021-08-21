const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const router = express.Router();
require('dotenv').config();
const { TOKEN_KEY } = process.env;
// signup route
router.post('/signup', async (req, res) => {
  const body = req.body;
  const { name, email, password } = body;

  if (!(name && email && password)) {
    return res.status(400).send({ error: 'All input is required' });
  }

  // createing a new mongoose doc from user data
  const user = new User(body);
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  user.token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, { expiresIn: 60 * 60 * 24 * 30 });
  user
    .save()
    .then((doc) => {
      const { password, ...newDoc } = doc._doc;
      return res.status(201).send({
        success: true,
        data: newDoc,
      });
    })
    .catch((error) => {
      if (error.code === 11000) {
        return res.status(400).send({
          success: false,
          error: {
            code: error.code,
            message: 'Email already exists',
          },
        });
      }
    });
});

// login route
router.post('/login', async (req, res) => {
  const body = req.body;
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const { password, ...newUser } = user._doc;
      res.status(200).json({ success: true, data: newUser });
    } else {
      res.status(400).json({
        success: false,
        error: {
          code: 5001,
          message: 'Invalid Password',
        },
      });
    }
  } else {
    res.status(401).json({
      success: false,
      error: {
        code: 5002,
        message: 'User does not exist',
      },
    });
  }
});

// Get User
router.get('/user', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null)
    return res.status(401).send({
      success: false,
      error: {
        code: 401,
        message: 'Unauthorized',
      },
    });

  jwt.verify(token, TOKEN_KEY, async (err, decode) => {
    if (err)
      return res.status(403).send({ success: false, error: { code: 403, message: `Forbidden, ${err.message}` } });
    const user = await User.findOne({ email: decode.email });
    const { password, ...newUser } = user._doc;
    return res.status(200).send({ success: true, data: newUser });
  });
});

module.exports = router;
