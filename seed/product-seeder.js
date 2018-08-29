var Product = require('../models/product');
var mongoose = require('mongoose');
var faker = require('faker');
var products = [];
var done = 0;
var images = [
	"http://cdn.shopify.com/s/files/1/0278/2953/articles/Blog2_600x.jpg?v=1495210341",
	"https://www.kiwicamping.co.nz/Images/Categories/pack.jpg",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJxLQsSbH1_uqSO6w89uQGsewl-UaL-dlfoLMS3i_eNHAAOJId",
	"https://cdn.shopify.com/s/files/1/0817/7355/products/71oLXNG1OjL._SL1500_large.jpg?v=1490047907",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCFILxIfhYJYPf-86a_fsMAUNkzxIjc7xUOHK3XcjVGnO5040WAw",
	"http://www.langya-camping.com/Uploads/5af95bc12607d.png",
	"https://images-na.ssl-images-amazon.com/images/I/31GO3dFTgDL._US500_.jpg"
]

mongoose.connect('mongodb://localhost:27017/store', {useNewUrlParser: true});

// PUSH ITEMS TO ARRAY
for (var i = 0; i < 10; i++) {
	products.push(
		new Product({
			title: faker.commerce.productName(),
			description: faker.lorem.paragraph(),
			imagePath: images[Math.floor(Math.random() * images.length)],
			price: faker.finance.amount()
		})
	)
}

// WAIT UNTIL ALL PRODUCTS SEEDED
for (var i = 0; i< products.length; i++) {
	products[i].save(function() {
		done++;
		if (done === products.length) {
			mongoose.disconnect();
		}
	});
}

