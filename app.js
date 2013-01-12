var express = require('express')
	, resource = require('express-resource')
	, config = require('./config')
	, app = express();

// konfigurace a spojeni s databazi
config.configure(app);
config.connect(app);

var BookController = require('./app/controllers/BookController');
var BookModel = require('./app/models/Book');

app.resource('books', BookController, {base: '/v1/api/', load: BookModel.findOneByUrl});

module.exports = app;