const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

mongoose.connect('mongodb://localhost/restaurantInfo', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

const RestaurantInfo = require('./models/restaurant_info')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  RestaurantInfo.find((err, restaurantinfos) => {
    if (err) return console.error(err)
    return res.render('index', { restaurantinfos })
  })
})

app.get('/restaurants', (req, res) => {
  return res.redirect('/')
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.get('/restaurants/:id', (req, res) => {
  RestaurantInfo.findById(req.params.id, (err, restaurantinfo) => {
    if (err) return console.error(err)
    return res.render('show', { restaurantinfo })
  })
})

app.post('/restaurants', (req, res) => {
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

app.get('/restaurants/:id/edit', (req, res) => {
  RestaurantInfo.findById(req.params.id, (err, restaurantinfo) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurantinfo })
  })
})

app.post('/restaurants/:id/edit', (req, res) => {
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

app.post('/restaurants/:id/delete', (req, res) => {
  RestaurantInfo.findById(req.params.id, (err, restaurantinfo) => {
    if (err) return console.error(err)
    restaurantinfo.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  RestaurantInfo.find({ name: new RegExp(keyword) }, (err, restaurantinfos) => {
    if (err) return console.error(err)
    res.render('index', { restaurantinfos, keyword })
  })
})

app.get('/sort/ascending', (req, res) => {
  RestaurantInfo.find({})
  .sort({name: 'asc'})
    .exec((err, restaurantinfos) => {
    if (err) return console.error(err)
    return res.render('index', { restaurantinfos })
  })
})

app.get('/sort/descending', (req, res) => {
  RestaurantInfo.find({})
  .sort({name: 'desc'})
    .exec((err, restaurantinfos) => {
    if (err) return console.error(err)
    return res.render('index', { restaurantinfos })
  })
})

app.get('/sort/category', (req, res) => {
  RestaurantInfo.find({})
  .sort({category: 'asc'})
    .exec((err, restaurantinfos) => {
    if (err) return console.error(err)
    return res.render('index', { restaurantinfos })
  })
})

app.get('/sort/location', (req, res) => {
  RestaurantInfo.find({})
  .sort({location: 'asc'})
    .exec((err, restaurantinfos) => {
    if (err) return console.error(err)
    return res.render('index', { restaurantinfos })
  })
})

app.use(express.static('public'))

app.listen(3000, () => {
  console.log('Express app is listening!')
})
