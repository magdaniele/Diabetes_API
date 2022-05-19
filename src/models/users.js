const { Schema } = require('mongoose');
const { GlucoseTest } = require('./glucose')

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  height: Number,
  weight: Number,
  birthDate: Date,
  glucoseTests: [GlucoseTest]
});

module.exports = { User }
