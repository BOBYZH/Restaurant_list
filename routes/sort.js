const express = require('express')
const router = express.Router()
const RestaurantInfo = require('../models/restaurant_info')

const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  let sortObject = {}
  const filter = req.query.filter
  const order = req.query.order
  console.log(filter, order)
  if (filter === 'name') {
    sortObject = { name: order }
  } else if (filter === 'category') {
    sortObject = { category: order }
  } else if (filter === 'location') {
    sortObject = { location: order }
  }
  console.log(sortObject)
  RestaurantInfo.find({ userId: req.user._id })
    .sort(sortObject)
    .exec((err, restaurantinfos) => {
      if (err) return res.sendStatus(500)
      return res.render('index', { restaurantinfos })
    })
})

module.exports = router
