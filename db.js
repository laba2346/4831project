const Promise = require('bluebird');
const initOptions = {
    promiseLib: Promise
};
const pgp = require('pg-promise')(initOptions);

const cn = {
    host: 'ec2-54-235-193-34.compute-1.amazonaws.com',
    port: 5432,
    database: 'dbkt5tfgdagmv7',
    user: 'fhttwaphawybpt',
    password: 'd888c67b12c6aaf6f7bcd61926302aa6d1b882d1a068adfb5419ec9da650b8f4'
};
var db = pgp(cn);

module.exports = db;
