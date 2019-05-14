var express = require('express'); 
var router = express.Router(); 
var userDao = require('../dao/userDao'); 

router.post('/login', function(req, res, next) { 
  userDao.login(req, res, next); 
}); 

module.exports = router;