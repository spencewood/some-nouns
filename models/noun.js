var mongoose = require('mongoose');
var schema = require('./schemas/noun-schema');
var config = require('../config').database;
var db = mongoose.createConnection(config.url);

schema.statics.random = function(callback) {
    this.count(function(err, count) {
        if (err) {
            return callback(err);
        }
        var rand = Math.floor(Math.random() * count);
        this.findOne().skip(rand).exec(callback);
    }.bind(this));
};

module.exports = db.model('noun', schema);