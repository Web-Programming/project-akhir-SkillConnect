var express = require('express');
var router = express.Router();

// Define a simple route for users
router.get('/', function(req, res, next) {
  res.send('User route');
});

module.exports = router;