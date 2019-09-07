const router = require('express').Router()
const {User, Place} = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, {include:[Place]})
  .then(user => res.send(user))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  const {lat, long, name} = req.body
  User.findById(req.params.id)
  .then(user => {
    return Place.create({lat, long, name, userId:user.id})
      .then(place => {return place})
  })
  .then(user => res.send(user))
  .catch(next);
})
