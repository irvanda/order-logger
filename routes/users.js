const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const dbConnect = require('../utils/db');

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: String,
    email: String,
  },
  {
    collection: 'user',
  }
);
const User = mongoose.model('User', UserSchema);

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const user = await User.find({}, { email: 0 });
  console.log('check00: ', user);
  res.json(user);
  res.end();
});

module.exports = router;
