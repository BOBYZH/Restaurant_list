const mongoose = require('mongoose')
const RestaurantInfo = require('../restaurant_info.js')
const restaurantList = require('./restaurant.json').results
const User = require('../user.js')
const users = require('./user.json').users
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost/restaurantInfo', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection // the default name of collection is "restaurantinfos"

db.on('error', () => {
  console.error('db error')
})

db.once('open', () => {
  console.log('db connected!')
  // create user data
  for (let i = 0; i < users.length; i++) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(users[i].password, salt, (err, hash) => {
        const newUser = new User({
          name: users[i].name,
          email: users[i].email,
          password: hash
        })
        newUser.save().then(user => {
          // create restaurantLlist data for each user
          for (let j = 0 + i * 3; j < (i + 1) * 3; j++) {
            RestaurantInfo.create({
              name: restaurantList[j].name,
              name_en: restaurantList[j].name_en,
              category: restaurantList[j].category,
              image: restaurantList[j].image,
              location: restaurantList[j].location,
              phone: restaurantList[j].phone,
              google_map: restaurantList[j].google_map,
              rating: restaurantList[j].rating,
              description: restaurantList[j].description,
              userId: user._id
            })
          }
        }).catch(err => {
          console.log(err)
        })
      })
    })
  }
  console.log('done')
})
