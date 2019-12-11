const express = require('express')
const router = express.Router()
const RestaurantInfo = require('../models/restaurant_info')

const { authenticated } = require('../config/auth')

// router.get('/', authenticated, (req, res) => {
//   RestaurantInfo.find({ userId: req.user._id }, (err, restaurantinfos) => {
//     if (err) return console.error(err)
//     return res.render('index', { restaurantinfos })
//   })
// })

const sortTypes = {
  nameAsc: {
    sortObject: {
      name: 'asc'
    },
    display: 'A -> Z'
  },
  nameDesc: {
    display: 'Z -> A',
    sortObject: {
      name: 'desc'
    }
  },
  categoryAsc: {
    display: '餐廳類別',
    sortObject: {
      category: 'asc'
    }
  },
  ratingDesc: {
    display: '餐廳評分',
    sortObject: {
      rating: 'desc'
    }
  }
}

router.get('/', authenticated, (req, res) => {
  const sortType = req.query.sortType
    ? sortTypes[req.query.sortType]
    : sortTypes.nameAsc // 預設
  RestaurantInfo.find({ userId: req.user._id })
    .sort(sortType.sortObject)
    .exec((err, restaurantinfos) => {
      if (err) return res.sendStatus(500)
      return res.render('index', { restaurantinfos, sortTypes })
    })
})

router.get('/search', authenticated, (req, res) => {
  const keyword = req.query.keyword
  RestaurantInfo.find({ name: new RegExp(keyword, 'i'), userId: req.user._id }, (err, restaurantinfos) => {
    if (err) return console.error(err)
    res.render('index', { restaurantinfos, keyword })
  })
})

module.exports = router
