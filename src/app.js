require('dotenv').config();
const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_CORS);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.post('/api/products', (req, res) => {
  res.status(201).json({
    message: req.body,
  });
});

app.use('/api/products', (req, res) => {
  const products = [];
  res.status(200).json(products);
});

module.exports = app;
