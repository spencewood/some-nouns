var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Noun = new Schema({
    name: {
        type: String,
        trim: true
    }
});

module.exports = Noun;