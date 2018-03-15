var data = require('./model.js');

exports.test = function(req, res) {
  res.send(data.testMessage);
};