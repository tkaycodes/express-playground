// constructor function (will be able to create cart objects)
module.exports = function Cart(oldCart) {

	// gets old cart object (or empty obj if first time)
	this.items = oldCart.items;
	this.totalQty = oldCart.totalQty;
	this.totalPrice = oldCart.totalPrice;

	this.add = function(item, id) {
		var storedItem = this.items[id];

		// if doesnt exist, create new one
		if (!storedItem) {
			storedItem = this.items[id] = {item: item, qty: 0, price: 0};
		}

		// if exists, increment quantity, adjust price
		storedItem.qty++;
		storedItem.price = storedItem.item.price * storedItem.qty;
		this.totalQty++;
		this.totalPrice += storedItem.price;
	};

	this.generateArray = function() {
		var arr = [];
		for (var id in this.items) {
			arr.push(this.items[id]);
		}
		return arr;
	};

};