var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Pitching Average Calculator', pa: ''});
});

router.get('/search', function(req, res, next){
    req.url = '/';
    res.render('index', { title: 'Pitching Average Calculator', pa: ''} );
});

router.post('/search', function(req, res, next) {
    console.log("Received search request for" + req.body.firstName + " " + req.body.lastName);
    db.one('SELECT * FROM pitchers WHERE last = $1', 'Kershaw').then(function(data) {
        console.log(data);
        res.render('index', { title: 'Pitching Average Calculator', pa: 'Just searched!', firstName: req.body.firstName, lastName: req.body.lastName});
    })
});

module.exports = router;
