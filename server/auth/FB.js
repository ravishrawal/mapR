const router = require('express').Router()
module.exports = router;

const FBConfig = {
  appID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET
}

router.get('/', function(req, res, next) {
  res.send('LOGGED IN!')
})

router.get('/me', function(req, response) {
    console.log(JSON.stringify(response));
});
