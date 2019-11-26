const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

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

app.use(methodOverride('_method'))

app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurants'))
app.use('/sort', require('./routes/sort'))
app.use('/users', require('./routes/user'))

app.use(express.static('public'))

app.listen(3000, () => {
  console.log('Express app is listening!')
})
