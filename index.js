const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const api = require('./api');

// Creating Middleware for controling cors and api entry point validations
app.use(function (req, res, next) {
    // add multiple origin here
    var allowedOrigins = ['http://localhost'];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        return res.status(200).json({});
    }
    next();
});

// Parsers
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
// API location
app.use('/api_connect', api.router);

// Set Port 
const port = process.env.PORT || '80';
app.set('port', port);
// Crrating Server
const server = http.createServer(app);
// Listning Server
server.listen(port, () => console.log(`Running on localhost:${port}`));
module.exports = { server: server };