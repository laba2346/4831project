var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'K Score Calculator | Landon Baxter', pa: ''});
});

router.get('/search', function(req, res, next){
    req.url = '/';
    res.render('index', { title: 'K Score Calculator | Landon Baxter', pa: ''} );
});

router.post('/search', function(req, res, next) {
    console.log("Received search request for" + req.body.firstName + " " + req.body.lastName);
    db.one('SELECT * FROM pitchers WHERE first= $1 AND last = $2', [req.body.firstName, req.body.lastName]).then(function(data) {
        console.log(data);
        console.log(data.kscore);
        res.render('index', { 
            title: 'K Score Calculator | Results', 
            kscore: data.kscore, 
            firstName: data.first, 
            lastName: data.last, 
            kOneOB: data.koneob,
            oneOB: data.oneob,
            kTwoOB: data.ktwoob,
            twoOB: data.twoob,
            kThreeOB: data.kthreeob,
            threeOB: data.threeob
        });
    }).catch(function (error) {
    console.log('ERROR:', error)
  });
});

module.exports = router;
