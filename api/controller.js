var vendingMachine = require('./model.js');

/*
=======================
Exported Endpoints
=======================
*/

/*
Gets the entire product catalog.
Refer to corresponding route for more information.
*/
exports.getAllProducts = function(req, res) {
	res.json(vendingMachine.products);
};

/*
Attempts to get product info for given 'productId'
Refer to corresponding route for more information.
*/
exports.getProduct = function(req, res) {
	var productId = req.params.productId

	if (inCatalog(productId)) {
		var product = vendingMachine.products[productId];
		res.send(`A ${product.name} costs ${product.price}`);
	} else {
		res.status(404).send('That productId does not correspond to a product.');
	}
};

/*
Checks if given product is in stock
Refer to corresponding route for more information.
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
Attempts to purchase a product. 
Refer to corresponding route for more information.
*/
exports.purchaseProduct = function(req, res) {
	var productId = req.body.productId;
	var inputedCash = req.body.cash;
	// Input validation
	if (!Number.isInteger(productId) || !Number.isInteger(inputedCash)) {
		res.status(400).send("Invalid parameters.");
	} else if (vendingMachine.inUse) {
		res.status(409).send("I'm being used by another customer. Please wait your turn!");
	} else if (!inCatalog(productId) || !inStock(productId)) {
		res.status(410).send("That product request either is not in stock or something I dont carry");
	} else if (inputedCash < vendingMachine.products[productId].price) {
		res.status(402).send(`That isn't enough to purchase that product. Please insert at least ${vendingMachine.products[productId].price}`);
	} else {
		vendingMachine.inUse = true;

		var transaction = {};
		var product = vendingMachine.products[productId];

		transaction.change = inputedCash - product.price;
		transaction.productVended = product;

		vendingMachine.stock[productId]--;
		vendingMachine.cashOnHand += product.price;

		console.log(`${transaction.productVended.name} purchased. ${transaction.change} returned. ${vendingMachine.stock[productId]} in stock.`);
		transaction.message = `Thank you for your purchase! Please enjoy your ${product.name}`;

		res.json(transaction)

		vendingMachine.inUse = false;
	}
}

/*
=======================
Internal Functions
=======================
*/

/*
Checks if the given 'productId' is a product in our catalog.
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