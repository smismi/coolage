var mongoose    = require('mongoose');
var log         = require('./log')(module);

mongoose.connect('mongodb://localhost/test1');
var db = mongoose.connection;
