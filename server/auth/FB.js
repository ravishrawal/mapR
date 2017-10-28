const router = require('express').Router()
const FB = require('fb')
const passport = require('passport')
module.exports = router;

const FBConfig = {
  appID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET
}

// FB.api('/', function(req, res, next) {
//   res.send('LOGGED IN!')
// })

router.get('/', passport.authenticate('facebook', { scope: 'email' }));

router.get('/callback',
  passport.authenticate('facebook', {
    successRedirect: '/', // or wherever
    failureRedirect: '/' // or wherever
  })
);

router.get('/me', function(req, response) {
    console.log(JSON.stringify(response));
});
