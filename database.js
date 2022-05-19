const mongoose = require('mongoose');
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME
} = process.env;

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}?retryWrites=true&w=majority`;

const connect = () => {
  mongoose.connect(url).then(() => {
    console.log('MongoDB is connected');
  }).catch(err => {
    console.log(err);
  });
}

module.exports = { url, connect }
