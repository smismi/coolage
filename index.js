var connect = require('connect');
connect.createServer(
	connect.static(__dirname)

).listen(8081);

var express = require('express');
var app = express();

