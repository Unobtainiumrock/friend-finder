// Vendor
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname,'/public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routes 
const APIRoutes = require(path.join(__dirname,'/routing/apiRoutes'));
APIRoutes.attach(app);

const HTMLRoutes = require(path.join(__dirname,'/routing/htmlRoutes'));
HTMLRoutes.attach(app);

app.listen(PORT,() => console.log(`Listening on port: ${PORT}`));