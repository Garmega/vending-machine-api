var express = require('express'),
  app = express(),
  port = 3000;

// Start API Server
app.listen(port);

console.log('API server started on: ' + port);