const express = require('express')
const router = express.Router()
const RestaurantInfo = require('../models/restaurant_info')

router.get('/ascending', (req, res) => {
  RestaurantInfo.find({})
    .sort({ name: 'asc' })
    .exec((err, restaurantinfos) => {
      if (err) return console.error(err)
      return res.render('index', { restaurantinfos })
    })
})

router.get('/descending', (req, res) => {
  RestaurantInfo.find({})
    .sort({ name: 'desc' })
    .exec((err, restaurantinfos) => {
      if (err) return console.error(err)
      return res.render('index', { restaurantinfos })
    })
})

router.get('/category', (req, res) => {
  RestaurantInfo.find({})
    .sort({ category: 'asc' })
    .exec((err, restaurantinfos) => {
      if (err) return console.error(err)
      return res.render('index', { restaurantinfos })
    })
})

router.get('/location', (req, res) => {
  RestaurantInfo.find({})
    .sort({ location: 'asc' })
    .exec((err, restaurantinfos) => {
      if (err) return console.error(err)
      return res.render('index', { restaurantinfos })
    })
})

module.exports = router
