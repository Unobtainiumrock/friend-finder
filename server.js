// Vendor
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

// Middleware
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname,'/public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routes 
const APIRoutes = require(path.join(__dirname,'/app/routing/apiRoutes'));
APIRoutes.attach(app);

const HTMLRoutes = require(path.join(__dirname,'/app/routing/htmlRoutes'));
HTMLRoutes.attach(app);

app.listen(PORT,() => console.log(`Listening on port: ${PORT}`));