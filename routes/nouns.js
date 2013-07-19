var async = require('async');
var _ = require('underscore');
var Noun = require('../models/noun');

exports.list = function(req, res){
    Noun.find({}, function(err, docs){
        if(err !== null){
            console.error(err);
            res.send(500, err);
            return;
        }
        res.render('index', { nouns: _(docs).pluck('name') });
    });
};

exports.random = function(req, res){
    var num = req.params.number;
    var calls = [];

    if(isNaN(num)){
        res.send(500, "Must supply a number.");
        return;
    }

    _(num).times(function(){
        calls.push(function(callback){
            Noun.random(callback);
        });
    });

    async.parallel(calls, function(err, docs){
        res.render('index', { nouns: _(docs).pluck('name') });
    });
};