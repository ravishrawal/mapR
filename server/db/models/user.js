const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  password: Sequelize.STRING,
  FBID: Sequelize.STRING
})

User.prototype.updatePlace = function(place) {
  var index = this.places.indexOf(place);
  console.log('INDEX', index);
  if(index===-1){
    this.places = this.places.concat([place])
  } else{this.places=this.places.filter((el)=>{return el!==place})}
  return this.save().then(user => {return user})
}

module.exports = User
