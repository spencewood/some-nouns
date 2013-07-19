var _ = require('underscore');

var Sanitizer = function(data){
    this.data = data;
};

Sanitizer.prototype.getLineArray = function(){
    return this.data.split('\n');
};

Sanitizer.prototype.delimitersToNewlines = function(){
    this.data = this.data.replace(/[,;]/g, '\n');
    return this;
};

module.exports = Sanitizer;