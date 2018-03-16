var vendingMachine = require('./model.js');

/*
=======================
Exported Endpoints
=======================
*/

/*
Attempts to get product info for given 'productId'
	Returns 200 and JSONified information on the corresponding product if 'productId' is valid.
	Returns 404 if 'productId' is invalid.
*/
exports.getProduct = function(req, res) {
	// TODO: Implement to error handling.
	var productId = req.params.productId

	if (inCatalog(productId)) {
		var product = vendingMachine.products[productId];
		res.send(`A ${product.name} costs ${product.price}`);
	} else {
		res.status(404).send('That productId does not correspond to a product.');
	}
};

/*
Gets all the product catalog.
	Returns 200 and JSONified information on all products in catalog.
*/
exports.getAllProducts = function(req, res) {
	res.json(vendingMachine.products);
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

/*
=======================
Internal Functions
=======================
*/

function inCatalog(productId) {
	return vendingMachine.products[productId] != undefined;
};

/*
Checks if the given 'productId' is in stock.
If stock quantity is 0 or undefined, returns false. 
*/
function inStock(productId) {
	return vendingMachine.stock[productId] != undefined ? vendingMachine.stock[productId] > 0 : false;
};