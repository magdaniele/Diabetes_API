const { Schema } = require('mongoose');
const GlucoseTest = require('./glucose')

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  about: { type: String, default: "" },
  imagePath: { type: String, default: "" },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  birthDate: { type: Date, required: true },
  glucoseTests: [GlucoseTest]
});

module.exports = User
