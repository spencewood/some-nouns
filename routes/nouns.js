var async = require('async');
var _ = require('underscore');
var Noun = require('../models/noun');
var config = require('../config');

exports.list = function(req, res){
    Noun.find({}, function(err, docs){
        if(err !== null){
            console.error(err);
            res.send(500, err);
            return;
        }
        res.render('index', { nouns: _.pluck(docs, 'name') });
    });
};

exports.random = function(req, res){
    var num = req.params.number;

    if(!isNaN(num)){
        var calls = [];
        _(num).times(function(){
            calls.push(function(callback){
                Noun.random(function(err, noun){
                    callback(null, noun);
                });
            });
        });

        async.parallel(calls, function(err, docs){
            res.render('index', { nouns: _.pluck(docs, 'name') });
        });
    }
};

exports.import = function(req, res){
    if(req.body !== null){
        //dirty auth
        if(req.body.password !== config.password){
            res.send(401);
            return;
        }
        if(req.body.nouns !== null){
            var nouns = req.body.nouns.split(',').map(function(noun){
                return { name: noun };
            });

            Noun.create(nouns, function(err){
                if(err !== null){
                    console.error(err);
                    res.send(500);
                    return;
                }
            });
        }
    }

    res.send(200);
};