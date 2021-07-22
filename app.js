const express = require('express');
const path = require('path');

const cameraRoutes = require('./routes/camera');
const teddyRoutes = require('./routes/teddy');
const furnitureRoutes = require('./routes/furniture');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/public'));
app.use('/images', express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/public'));


app.use(express.urlencoded({extended: true}));
app.use(express.json());

// API
app.use('/api/cameras', cameraRoutes);
app.use('/api/teddies', teddyRoutes);
app.use('/api/furniture', furnitureRoutes);

// FRONT
app.get('/', function(req,res) {
  //call all teddies
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/product/:id', function(req,res) {
  // call one teddy with id
  res.sendFile(path.join(__dirname, 'product.html'));
});
app.get('/order', function(req,res) {
  
  res.sendFile(path.join(__dirname, 'shoppingcart.html'));
});

module.exports = app;
