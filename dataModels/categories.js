var mongoose = require('mongoose');
var categories = mongoose.model('categories', {
    name: { type: String },
    catId: { type: Number },
});
module.exports = categories;