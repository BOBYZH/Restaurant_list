const mongoose = require('mongoose')
const RestaurantInfo = require('../restaurant_info.js')
const restaurantList = require('./restaurant.json')

mongoose.connect('mongodb://localhost/restaurantInfo', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection // the default name of collection is "restaurantinfos"

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')

  for (let i = 0; i < restaurantList.results.length; i++) {
    RestaurantInfo.create(restaurantList.results[i])
  }
})

console.log('done')