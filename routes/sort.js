const express = require('express')
const router = express.Router()
const RestaurantInfo = require('../models/restaurant_info')

// router.get('/ascending', (req, res) => {
//  RestaurantInfo.find({})
//    .sort({ name: 'asc' })
//    .exec((err, restaurantinfos) => {
//      if (err) return console.error(err)
//      return res.render('index', { restaurantinfos })
//    })
// })
//
// router.get('/descending', (req, res) => {
//  RestaurantInfo.find({})
//    .sort({ name: 'desc' })
//    .exec((err, restaurantinfos) => {
//      if (err) return console.error(err)
//      return res.render('index', { restaurantinfos })
//    })
// })
//
// router.get('/category', (req, res) => {
//  RestaurantInfo.find({})
//    .sort({ category: 'asc' })
//    .exec((err, restaurantinfos) => {
//      if (err) return console.error(err)
//      return res.render('index', { restaurantinfos })
//    })
// })
//
// router.get('/location', (req, res) => {
//  RestaurantInfo.find({})
//    .sort({ location: 'asc' })
//    .exec((err, restaurantinfos) => {
//      if (err) return console.error(err)
//      return res.render('index', { restaurantinfos })
//    })
// })
// 
router.get('/name', (req, res) => {
  const order = req.query.order
  const sortObject = { name: order}
  RestaurantInfo.find({})
    .sort(sortObject)
    .exec((err, restaurantinfos) => {
      if (err) return res.sendStatus(500)
      return res.render('index', { restaurantinfos })
    })
})

router.get('/category', (req, res) => {
  const order = req.query.order
  const sortObject = { category: order}
  RestaurantInfo.find()
    .sort(sortObject)
    .exec((err, restaurantinfos) => {
      if (err) return res.sendStatus(500)
      return res.render('index', { restaurantinfos })
    })
})

router.get('/location', (req, res) => {
  const order = (req.query.order).toString()
  const sortObject = { location: order}
  RestaurantInfo.find()
    .sort(sortObject)
    .exec((err, restaurantinfos) => {
      if (err) return res.sendStatus(500)
      return res.render('index', { restaurantinfos })
    })
})

//router.get('/', (req, res) => {
//  let sortObject ={}
//  let filter = req.query.filter
//  const order = req.query.order
//  console.log(filter, order)
//  if (filter = 'name') {
//    sortObject = { name: order}
//  } else if (filter = 'category') {
//    sortObject = { category: order}
//  } else if (filter = 'location') {
//    sortObject = { location: order}
//  }
//  console.log(sortObject)
//  RestaurantInfo.find({})
//    .sort(sortObject)
//    .exec((err, restaurantinfos) => {
//      if (err) return res.sendStatus(500)
//      return res.render('index', { restaurantinfos })
//    })
//})

module.exports = router
