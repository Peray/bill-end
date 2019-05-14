var express = require('express'); 
var router = express.Router(); 
var productDao = require('../dao/productDao'); 


router.get('/queryAll', function(req, res, next) { 
    productDao.queryAll(req, res, next); 
}); 

router.post('/addProduct', function(req, res, next) { 
    productDao.add(req, res, next); 
}); 

router.post('/updateProduct', function(req, res, next) { 
    productDao.update(req, res, next); 
});

router.get('/deleteProduct', function(req, res, next) { 
    productDao.delete(req, res, next); 
}); 

router.get('/queryById', function(req, res, next) { 
    productDao.queryById(req, res, next); 
}); 



module.exports = router;