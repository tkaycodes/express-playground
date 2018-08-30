var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');
var axios = require('axios');
var optimizely = require('@optimizely/optimizely-sdk');

/* GET home page. */
router.get('/', function(req, res, next) {

  var totalCartCount = req.session.cart ? req.session.cart.totalQty : 0;

  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  var userId = makeid();

  axios.get('https://cdn.optimizely.com/datafiles/SLFLfzgmE9m5sZtczLqXnc.json')
    .then(function (response) {

      console.log('SUCCESS!!=======')
      var optimizelyClientInstance = optimizely.createInstance({datafile: response.data});

      console.log(userId);
      // Activate an A/B test
      // var variation = optimizelyClientInstance.activate('express-playground', makeid());
      var variation = optimizelyClientInstance.activate('express-playground', userId);

      console.log('varitaion is !!');
      console.log(variation);

      if (variation === 'control') {
        // Execute code for "control" variation
        console.log("THIS IS CONTROL!!!!!!!!");
      } else if (variation === 'varA') {
        // Execute code for "treatment" variation
        console.log("VAR A !!!!!!!!!");
      } else if (variation === 'varB') {
        // Execute code for users who don't qualify for the experiment
        console.log("VAR B !!!!!!!!!");
      }

    })
    .catch(function (error) {

      console.log('ERROR!!=======')
      console.log(error);
      // debugger;

  });

  Product.find(function (err, docs) {

    res.render('store/index', {
      title: 'Product Listings',
      products: docs,
      cartCount: totalCartCount,
    });

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
