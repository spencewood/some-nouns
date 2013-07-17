var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Noun = new Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true
    }
});