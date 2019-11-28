const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const restaurantInfoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    validate:{
      validator: validator.isURL,
      message: '{VALUE} is not a valid URL',
      isAsync: false
    }
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    validate:{
      validator: validator.isMobilePhone,
      message: '{VALUE} is not a valid phone number',
      isAsync: false
    }
  },
  google_map: {
    type: String,
    required: true,
    validate:{
      validator: validator.isURL,
      message: '{VALUE} is not a valid URL',
      isAsync: false
    }
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    multipleOf: 0.1,
    required: true,
//    validate:{
//      validator: validator.isFloat,
//      message: '{VALUE} is not a valid float',
//      isAsync: false
//    }
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('RestaurantInfo', restaurantInfoSchema)
