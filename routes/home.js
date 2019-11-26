const express = require('express')
const router = express.Router()
const RestaurantInfo = require('../models/restaurant_info')

const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  RestaurantInfo.find({ userId: req.user._id },(err, restaurantinfos) => {
    if (err) return console.error(err)
    return res.render('index', { restaurantinfos })
  })
})

router.get('/search', authenticated, (req, res) => {
  const keyword = req.query.keyword
  RestaurantInfo.find({ name: new RegExp(keyword, 'i') }, (err, restaurantinfos) => {
    if (err) return console.error(err)
    res.render('index', { restaurantinfos, keyword })
  })
})

module.exports = router
