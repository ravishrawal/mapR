const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router



router.use('/fb', require('./FB'))

router.get('/', (req, res, next) => {
  res.send(req.session)
})

router.post('/login', (req, res, next) => {
  const {email, password, FBID} = req.body;
  console.log(req.body);
  let credential;
  FBID ? credential = {FBID} : credential = {email, password}
  User.findOne({
    where: credential
  })
    .then(user => {
      if(!user){
        res.sendStatus(401)
      }else{
        req.session.userId = user.id;
        res.status(200).send(user)
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  const {email, password, FBID} = req.body;
  console.log(req.body);
  let credential;
  FBID ? credential = {FBID} : credential = {email, password}
  User.create(credential)
    .then(user => {
        res.status(200).send(user)
      })
    .catch(next)
})
