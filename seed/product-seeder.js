var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/store', {useNewUrlParser: true});

var products = [
	new Product({
		imagePath: 'https://www.kiwicamping.co.nz/Images/Categories/pack.jpg',
		title: 'cool bag',
		description: 	'This is a cool bag with lots of features!!',
		price: 			400
	}),
	new Product({
		imagePath: 'https://www.kiwicamping.co.nz/Images/Categories/pack.jpg',
		title: 'cool bag 2',
		description: 'This is another cool bag with lots of features!!',
		price: 600
	}),
	new Product({
		imagePath: 'https://www.kiwicamping.co.nz/Images/Categories/pack.jpg',
		title: 'cool bag 3',
		description: 'This is a third cool bag with lots of features!!',
		price: 900
	})
]

var done = 0;

for (var i = 0; i< products.length; i++) {
	products[i].save(function() {
		done++;
		if (done === products.length) {
			mongoose.disconnect();
		}
	});
}

