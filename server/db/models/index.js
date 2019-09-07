const User = require('./user')
const Place = require('./place')


User.hasMany(Place);

module.exports = {
  User,
  Place
}
