var express = require('express'),
	app = express(),
	port = 3000;

  // Reigstering routes.
var routes = require('./api/routes.js'); 
routes(app);

// Start API Server
app.listen(port);

console.log('API server started on: ' + port);