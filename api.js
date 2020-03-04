const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://lalith:Lalith123@cluster0-shard-00-00-kpxwj.gcp.mongodb.net:27017,cluster0-shard-00-01-kpxwj.gcp.mongodb.net:27017,cluster0-shard-00-02-kpxwj.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true, useCreateIndex: true, });
var categories = require("./dataModels/categories");
var products = require("./dataModels/products");

// Inserting Basic data

// Creating api to delete categorie api expecting body {id: /catId/}
router.post('/deleteCat', ((req, res) => {
    // Finding one catogery and deleting that
    categories.findOneAndDelete({ catId: req.body.id }).then((cat) => {
        // Storing deleted cat
        const responseObj = { DeletedCategorie: cat }
        new Promise((resolve, reject) => {
            // finding prods relared to deleted cat 
            products.find({ catId: req.body.id }).then((prods) => {
                // returning prods 
                resolve(prods)
            }).catch((e) => reject(e));
        }).then((prds) => {
            // storing related prods in response object
            responseObj.DeletedProds = prds;
            // deleting related products
            products.deleteMany({ catId: req.body.id }).then((prod) => {
                // sending Response
                return ({ msg: 'Category and related products deleted ', deletedData: responseObj });
            }).catch((e) => { throw e });
        }).catch((e) => {
            console.log(e);
            res.send({ msg: 'Some error occured', error: e })
        })
    });
}));




// Setting basic data
// var cat = [
//     { name: 'Clothing', catId: 1 },
//     { name: 'Electronics', catId: 2 },
//     { name: 'Fancy', catId: 3 },
//     { name: 'Food', catId: 4 },
//     { name: 'Travel', catId: req.body.id },
//     { name: 'Medical', catId: req.body.id }
// ]
// var productsItems = [
//     {name: 'shirts', catID: 1 },
//     {name: 'pants', catID: 1 },
//     {name: 'casulas', catID: 1 },
//     {name: 'suits', catID: 1 },
//     {name: 'shorts', catID: 1 },
//     {name: 'computers', catID: 2 },
//     {name: 'tvs', catID: 2 },
//     {name: 'phones', catID: 2 },
//     {name: 'bottles', catID: 3 },
//     {name: 'burgers', catID: 4 },
//     {name: 'trains', catID: req.body.id },
//     {name: 'backpain', catID: req.body.id },
// ]
// categories.collection.insertMany(cat, function (err, docs) {
//     if (err) { return console.error(err); } else { console.log("Multiple documents inserted to Collection"); }
// });
// products.collection.insertMany(productsItems, function (err, docs) {
//     if (err) { return console.error(err); } else { console.log("Multiple documents inserted to Collection"); }
// });
module.exports = { router };