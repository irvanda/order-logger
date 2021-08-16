const mongoose = require('mongoose');

const dbConnect = async () => {
  await mongoose.connect('mongodb://127.0.0.1/km', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

module.exports = dbConnect;
