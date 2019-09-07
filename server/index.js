const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('./db')
const PORT = process.env.PORT || 8080
const app = express()
module.exports = app
const User = require('./db/models/user')
const Place = require('./db/models/place')
var session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('../secrets')


const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // auth and api routes
  app.use(session({
    secret: 'ravmapR',
    resave: false
  }));
  app.use(function (req, res, next) {
    console.log('session', req.session);
    next();
  });
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new FacebookStrategy({
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.callbackURL
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log('---', 'in verification callback', profile, '---');
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
      done();
    }
  ));
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))



  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`))
}

const syncDb = () => db.sync({ force:true })

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  syncDb()
    .then(createApp)
    .then(()=>{
      User.create({
        name: "Zeke",
        email: "zeke@zeke.zeke",
        password: "123"
      })
      .then(user => {
        Promise.all([
        Place.create({lat:40, long:50, name:'Place1', userId:user.id}),
        Place.create({lat:25, long:13, name:'Place1', userId:user.id}),
        Place.create({lat:89, long:09, name:'Place1', userId:user.id}),
        Place.create({lat:65, long:08, name:'Place1', userId:user.id}),
        Place.create({lat:2, long:07, name:'Place1', userId:user.id}),
        Place.create({lat:23, long:78, name:'Place1', userId:user.id}),
        Place.create({lat:40, long:43, name:'Place1', userId:user.id}),
        Place.create({lat:33, long:65, name:'Place1', userId:user.id}),
        Place.create({lat:78, long:02, name:'Place1', userId:user.id}),
        Place.create({lat:13, long:23, name:'Place1', userId:user.id}),
        Place.create({lat:40, long:22, name:'Place1', userId:user.id}),
        Place.create({lat:40, long:75, name:'Place1', userId:user.id})
        ])
      })
    })
    .then(startListening)
} else {
  createApp()
}
