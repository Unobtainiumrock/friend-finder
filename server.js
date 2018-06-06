'use strict';

// Vendor
var express = require('express');
var app = express();
// const PORT = process.env.port || 3000;
var path = require('path');

// Middleware
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes 
var APIRoutes = require(path.join(__dirname, '/app/routing/apiRoutes'));
APIRoutes.attach(app);

var HTMLRoutes = require(path.join(__dirname, '/app/routing/htmlRoutes'));
HTMLRoutes.attach(app);

app.listen(process.env.port || 3000, function () {
  return console.log('Listening on port: ' + (process.env.port || 3000));
});