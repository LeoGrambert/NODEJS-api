require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('./helpers/logger');

const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/myFirstDatabase?retryWrites=true&w=majority`,
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
  res.status(201).json({
    message: req.body,
  });
});

app.use('/api/products', (req, res) => {
  const products = [];
  res.status(200).json(products);
});

module.exports = app;
