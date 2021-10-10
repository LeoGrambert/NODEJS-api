require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('./helpers/logger');
const Product = require('./models/product');

const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => logger.info('Connected to MongoDB'))
  .catch(() => logger.error('MongoDB connection failure'));

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
  delete req.body._id;
  const product = new Product({
    ...req.body,
  });
  product
    .save()
    .then(() => res.status(201).json({ message: 'Product created' }))
    .catch((error) => res.status(400).json({ error }));
});

app.get('/api/products/:id', (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => res.status(200).json(product))
    .catch((error) => res.status(404).json({ error }));
});

app.put('/api/products/:id', (req, res) => {
  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Product updated' }))
    .catch((error) => res.status(400).json({ error }));
});

app.delete('/api/products/:id', (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Product deleted' }))
    .catch((error) => res.status(400).json({ error }));
});

app.use('/api/products', (req, res) => {
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
