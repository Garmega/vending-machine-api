var express = require('express'),
	app = express(),
	port = 3000
	bodyParser = require('body-parser');

// Enable request body parsing.
app.use(bodyParser.json())

// Reigstering routes.
var routes = require('./api/routes.js'); 
routes(app);

// Start API Server
app.listen(port);

console.log('API server started on: ' + port);