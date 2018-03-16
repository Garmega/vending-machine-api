module.exports = function(app) {
	var vendingMachine = require('./controller.js');

	/*
	Gets the entire product catalog.
	Output:
		returns 200 and JSONified information on all products in catalog.

	*/
	app.route('/products')
		.get(vendingMachine.getAllProducts);

	/*
	Checks if the given 'productId' is in stock.
	Input:
		productId: Integer ID corresponding to a valid product.

	Output:
		returns 200 and JSONified information on the corresponding product if 'productId' is valid.
		returns 404 if 'productId' is invalid.
	*/
	app.route('/products/:productId')
		.get(vendingMachine.getProduct);

	/*
	Checks if the given 'productId' is in stock.
	Input:
		productId: Integer ID corresponding to a valid product.

	Output:
		Returns 200 if product is in stock.
		Returns 202 if product is NOT in stock.
	*/
	app.route('/inventory/:productId')
		.get(vendingMachine.inStock);

	/*
	Attempts to purchase a product.
	Input (In request body form):
		productId: Integer ID corresponding to a valid product.
		cash: Integer dollar amount.

	Output:
		returns 400 if parameters passed in are invalid.
		returns 409 if vending machine is in use already.
		returns 410 if product is out of stock or does not exist.
		returns 402 if insufficient funds to purchase product.
		returns 200 and a JSON object with the product and change
					if product is in stock and funds are sufficient.  
	*/
	app.route('/purchase')
		.post(vendingMachine.purchaseProduct);
};