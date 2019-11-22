const express = require('express')
const router = express.Router()
const RestaurantInfo = require('../models/restaurant_info')

router.get('/', (req, res) => {
  RestaurantInfo.find((err, restaurantinfos) => {
    if (err) return console.error(err)
    return res.render('index', { restaurantinfos })
  })
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  RestaurantInfo.find({ name: new RegExp(keyword, 'i') }, (err, restaurantinfos) => {
    if (err) return console.error(err)
    res.render('index', { restaurantinfos, keyword })
  })
})

module.exports = router
