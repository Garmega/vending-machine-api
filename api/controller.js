var inventory = require('./model.js');

exports.getProduct = function(req, res) {
	// TODO: Implement to error handling.
	var productId = req.params.productId

	if (validProduct(productId)) {
		res.json(inventory.products[productId]);
	} else {
		res.status(404).send('That productId does not correspond to a product.');
	}
};

exports.getAllProducts = function(req, res) {
	res.json(inventory.products);
};

var validProduct = function(productId) {
	return inventory.products[productId] != undefined;
};

/*
Checks if the given 'productId' is in stock.
If stock quantity is 0 or undefined, returns false. 
*/
var isAvailable = function(productId) {
	return inventory.stock[productId] == 0;
};