const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

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

app.use(session({
  secret: 'my secret key',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated() 
  next()
})

app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurants'))
app.use('/sort', require('./routes/sort'))
app.use('/users', require('./routes/user'))

app.use(express.static('public'))

app.listen(3000, () => {
  console.log('Express app is listening!')
})
