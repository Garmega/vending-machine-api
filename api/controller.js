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

/*
Checks if the given 'productId' is in stock.
Returns 200 if product is in stock.
Returns 202 if product is NOT in stock.
*/
exports.inStock = function(req, res) {
	var productId = req.params.productId;

	if (inStock(productId)) {
		res.send('Product is in stock');
	} else {
		res.status(202).send('Product is NOT in stock');
	}
}

var validProduct = function(productId) {
	return inventory.products[productId] != undefined;
};

/*
Checks if the given 'productId' is in stock.
If stock quantity is 0 or undefined, returns false. 
*/
var inStock = function(productId) {
	if (inventory.stock[productId] != undefined) {
		return inventory.stock[productId] != 0;
	}

	return false;
};