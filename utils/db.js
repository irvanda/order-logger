const mongoose = require('mongoose');
require('dotenv').config();
const { MONGO_URI } = process.env;

const dbConnect = async () => {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

module.exports = dbConnect;
