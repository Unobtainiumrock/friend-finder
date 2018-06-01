// Setup
var express = require('express');
var app = express();
var port = process.env.port || 3000;
var path = require('path');

// Middleware
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname,'/app/public')))
app.use(bodyParser.json());

// Endpoints 
var apiRoutes = require(path.join(__dirname,'app/routing/apiRoutes'));
var htmlRoutes = require(path.join(__dirname,'app/routing/htmlRoutes'));

// Routes 
app.get('/api/friends',apiRoutes.getFriends);
app.post('/api/friends',apiRoutes.sendSurvey);

app.get('/survey',htmlRoutes.administerSurvey);
app.get('/',htmlRoutes.default);
