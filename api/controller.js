var data = require('./model.js');

exports.getProduct = function(req, res) {
	// TODO: Implement to error handling.
	var productId = req.params.productId
	res.json(data.products[productId]);
};

exports.getAllProducts = function(req, res) {
	res.json(data.products);
};