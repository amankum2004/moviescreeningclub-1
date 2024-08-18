// foodmodel.js

const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Ensure 'User' refers to your user model
    required: true
  },
  foodList: {
    type: [[mongoose.Schema.Types.ObjectId, Number]], // Array of arrays with ObjectId and Number
    validate: {
      validator: function (v) {
        return v.every(
          (item) =>
            Array.isArray(item) &&
            item.length === 2 &&
            mongoose.Types.ObjectId.isValid(item[0]) &&
            typeof item[1] === 'number'
        )
      },
      message:
        'Invalid format for foodList. Each item should be an array of length 2 with an ObjectId and a number.'
    },
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  delivered: {
    type: Boolean,
    default: false
  }
})

const Food = mongoose.model('Food', foodSchema)

module.exports = Food
