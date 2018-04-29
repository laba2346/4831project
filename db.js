const Promise = require('bluebird');
const initOptions = {
    promiseLib: Promise
};
var config = require('./config.js').get(process.env.NODE_ENV);
const pgp = require('pg-promise')(initOptions);

var db = pgp(config.cn);

module.exports = db;
