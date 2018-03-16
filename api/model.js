// Data model implementation

module.exports = {
	inUse: false,

	cashOnHand: 10.00,

	stock: {
		1 : 10,
		2 : 5,
		3 : 1,
		4 : 0
	},

	products: {
		1: {
			name: 'Coke',
			price: 2.50
		},

		2: {
			name: 'Sprite',
			price: 2.50
		},

		3: {
			name: 'Dr. Pepper',
			price: 3.00
		},

		4: {
			name: 'Fanta',
			price: 3.00
		}
	}
};