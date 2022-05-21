const { Schema } = require('mongoose');

const Meal = new Schema({
  category: {type: String, required: true},
  name: {type: String, required: true},
  carbohydrates: {type: Number, required: true},
})

module.exports = Meal
