var mongoose = require('mongoose');
var schema = require('./schemas/noun-schema');
var config = require('../config').database;
var db = mongoose.createConnection(config.url);

module.exports = db.model('noun', schema);