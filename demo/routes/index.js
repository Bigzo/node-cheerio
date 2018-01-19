var express = require('express');
var router = express.Router();
var httpGet = require('./hero.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/herodata', function(req, res) {
 
  httpGet.httpGet(function (herolis) {
    res.send(200, herolis);
  })

})

module.exports = router;
