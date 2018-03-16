module.exports = function(app) {
	var vendingMachine = require('./controller.js');

	app.route('/products')
		.get(vendingMachine.getAllProducts);

	app.route('/products/:productId')
		.get(vendingMachine.getProduct);
};