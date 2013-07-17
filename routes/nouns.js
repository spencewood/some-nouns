var Noun = require('../models/noun');

exports.list = function(req, res){
    Noun.find({}, function(err, docs){
        if(err !== null){
            console.error(err);
            res.send(500, err);
            return;
        }
        res.render('index', { nouns:  docs });
    });
};

exports.import = function(req, res){
    if(req.body !== null && req.body.nouns !== null){
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

    res.send(200);
};