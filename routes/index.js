var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');

/* GET home page. */
router.get('/', function(req, res, next) {
  var totalCartCount = req.session.cart ? req.session.cart.totalQty : 0;
  Product.find(function(err, docs) {
    res.render('store/index', { title: 'Product Listings', products: docs, cartCount: totalCartCount });
  });
});

router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  // if cart exists, pass in, else pass in empty js object
  var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });

  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    // console.log(req.session.cart);
    res.redirect('/');
  });
});

module.exports = router;
