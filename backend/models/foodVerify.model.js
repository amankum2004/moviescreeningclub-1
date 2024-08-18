const mongoose = require('mongoose')

const FoodVerifySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  otp: {
    type: String,
    required: true
  },
  isdelivered:{
    type:Boolean,
    default:false
  },
  
})


module.exports = mongoose.model('FoodVerification', orderSchema);
