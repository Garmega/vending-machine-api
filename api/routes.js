module.exports = function(app) {
  var controller = require('./controller.js');
  // Test route
  app.route('/test')
    .get(controller.test);
};