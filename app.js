const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const restaurantList = require('./restaurant.json')

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

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants', (req, res) => {
  res.send('List all restaurant infos')
})

app.get('/restaurants/new', (req, res) => {
  res.send('Show page of creating a restaurant info')
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantInfo = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurantInfo })
})

app.post('/restaurants', (req, res) => {
  res.send('Create a restaurant info')
})

app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  res.send('Show page of editing a restaurant info')
})

app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  res.send('Edit a restaurant info')
})

app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  res.send('Delete a restaurant info')
})


app.get('/search', (req, res) => {

  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.use(express.static('public'))

app.listen(3000, () => {
  console.log(`Express app is listening!`)
})