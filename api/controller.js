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

exports.purchaseProduct = function(req, res) {
	var productId = req.body.productId;
	var inputedCash = req.body.cash;

	// Input validation
	// TODO Validate that productId and inputedCash are of the right types.
	if (productId == undefined || inputedCash == undefined) {
		res.status(400).send("Invalid parameters.");
	} 

	var transaction = {};
	transaction.change = inputedCash;

	if (vendingMachine.inUse) {
		transaction.message = "I'm in the middle of being used by another customer. Please wait your turn!";
		res.status(409).json(transaction);
	}

	// Vending machine is now considered in-use.
	vendingMachine.inUse = true;

	var product = vendingMachine.products[productId];
	transaction.change = inputedCash;

	// Sufficient stock and funds validation
	if (!inCatalog(productId) || !inStock(productId)) {
		transaction.message = "That product request either is not in stock or something I dont carry";
		res.status(410);
	} else if (inputedCash < product.price) {
		transaction.message = `That isn't enough to purchase that product. Please insert at least ${product.price}`;
		res.status(402);
	} else {
		// Everything has passed. Vend the product.
		vendingMachine.stock[productId]--;
		vendingMachine.cashOnHand += product.price;


		transaction.productVended = product;
		transaction.change = transaction.change - product.price;

		console.log(`${transaction.productVended.name} purchased. ${transaction.change} returned. ${vendingMachine.stock[productId]} in stock.`);
		transaction.message = `Thank you for your purchase! Please enjoy your ${product.name}`;
		res.status(200);
	}

	vendingMachine.inUse = false;
	res.json(transaction);
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