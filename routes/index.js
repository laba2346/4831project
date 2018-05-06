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
    var firstName = cleanName(req.body.firstName);
    var lastName = cleanName(req.body.lastName);
    if(firstName != '' && lastName != ''){
        console.log("Received search request for " + req.body.firstName + " " + req.body.lastName);
        db.one('SELECT * FROM pitchers WHERE first= $1 AND last = $2', [firstName, lastName])
            .then(function(data) {
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
            })
            .catch(function(err){
                res.render('index', {
                    title:'K Score Calculator | Landon Baxter',
                    err: 'Invalid search. Try again.'
                });
            }); 
    }
});
    
function cleanName(name) {
    if(name != ''){
        return name[0].toUpperCase() + name.substr(1).toLowerCase();
    }
}
module.exports = router;
