const { Schema } = require('mongoose');

const GlucoseTest = new Schema({
  date: { type: Date, default: Date.now },
  value: { type: Number, required: true }
});

module.exports = GlucoseTest
