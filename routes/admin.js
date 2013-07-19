var _ = require('underscore');
var Noun = require('../models/noun');
var Sanitizer = require('../utils/sanitizer');

exports.index = function(req, res){
	Noun.find({}, function(err, docs){
		res.render('admin', { data: _(docs).pluck('name').join('\n') });
	});
};

exports.import = function(req, res){
    if(req.body !== null){
        var nouns = new Sanitizer(req.body.nouns)
            .delimitersToNewlines()
            .getLineArray()
            .map(function(noun){
                return { name: noun };
            });

        Noun.clear(function(){
            Noun.create(nouns, function(err){
                if(err !== null){
                    console.error(err);
                    res.send(500);
                    return;
                }
            });
        });
    }

    res.redirect('/admin');
};