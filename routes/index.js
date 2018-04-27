var express = require('express');
var router = express.Router();
var pgp = require('pg-promise');
var db = pgp('postgres://fhttwaphawybpt:d888c67b12c6aaf6f7bcd61926302aa6d1b882d1a068adfb5419ec9da650b8f4@ec2-54-235-193-34.compute-1.amazonaws.com:5432/dbkt5tfgdagmv7');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Pitching Average Calculator', pa: ''});
});

router.get('/search', function(req, res, next){
    req.url = '/';
    res.render('index', { title: 'Pitching Average Calculator', pa: ''} );
});

router.post('/search', function(req, res, next) {
    console.log("Received search request for" + req.body.firstName + " " + req.body.lastName);
    db.any('SELECT * FROM pitchers WHERE last = $1', 'Kershaw').then(function(data) {
        res.render('index', { title: 'Pitching Average Calculator', pa: 'Just searched!', firstName: data, lastName: req.body.lastName});
    })
});

module.exports = router;
