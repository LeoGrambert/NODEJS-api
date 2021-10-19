require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('./helpers/logger');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const helmet = require('helmet');

const app = express();

app.use(helmet());

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

app.use('/api/products', productRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
