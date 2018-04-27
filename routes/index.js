var express = require('express');
var router = express.Router();
var pgp = require('pg-promise');
const cn = {
    host: 'ec2-54-235-193-34.compute-1.amazonaws.com',
    port: 5432,
    database: 'dbkt5tfgdagmv7',
    user: 'fhttwaphawybpt',
    password: 'd888c67b12c6aaf6f7bcd61926302aa6d1b882d1a068adfb5419ec9da650b8f4'
};
var db = pgp(cn);
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
        console.log(data);
        res.render('index', { title: 'Pitching Average Calculator', pa: 'Just searched!', firstName: req.body.firstName, lastName: req.body.lastName});
    })
});

module.exports = router;
