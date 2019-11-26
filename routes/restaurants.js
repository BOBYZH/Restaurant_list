const express = require('express')
const router = express.Router()
const RestaurantInfo = require('../models/restaurant_info')

const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  return res.redirect('/')
})

router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

router.get('/:id', authenticated, (req, res) => {
  RestaurantInfo.findById(req.params.id, (err, restaurantinfo) => {
    if (err) return console.error(err)
    return res.render('show', { restaurantinfo })
  })
})

router.post('/', authenticated, (req, res) => {
  const restaurantinfo = new RestaurantInfo({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })

  restaurantinfo.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

router.get('/:id/edit', authenticated, (req, res) => {
  RestaurantInfo.findById(req.params.id, (err, restaurantinfo) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurantinfo })
  })
})

router.put('/:id/', authenticated, (req, res) => {
  RestaurantInfo.findById(req.params.id, (err, restaurantinfo) => {
    if (err) return console.error(err)
    restaurantinfo.name = req.body.name
    restaurantinfo.name_en = req.body.name_en
    restaurantinfo.category = req.body.category
    restaurantinfo.image = req.body.image
    restaurantinfo.location = req.body.location
    restaurantinfo.phone = req.body.phone
    restaurantinfo.google_map = req.body.google_map
    restaurantinfo.rating = req.body.rating
    restaurantinfo.description = req.body.description
    restaurantinfo.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

router.delete('/:id/delete', authenticated, (req, res) => {
  RestaurantInfo.findById(req.params.id, (err, restaurantinfo) => {
    if (err) return console.error(err)
    restaurantinfo.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router
