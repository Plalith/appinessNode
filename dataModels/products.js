var mongoose = require('mongoose');

var products = mongoose.model('products', {
    name: { type: String, },
    catID: { type: Number, },

});
module.exports = products;