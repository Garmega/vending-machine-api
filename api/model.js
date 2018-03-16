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
			price: 2.49
		},

		2: {
			name: 'Sprite',
			price: 2.49
		},

		3: {
			name: 'Dr. Pepper',
			price: 2.99
		},

		4: {
			name: 'Fanta',
			price: 2.99
		}
	}
};