const Product = require('../models/product');
const fs = require('fs');

exports.createProduct = (req, res) => {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    price: req.body.price,
    userId: req.body.userId,
    reduction: req.body.reduction,
    active: req.body.active,
  });
  product
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Post saved successfully!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getProduct = (req, res) => {
  Product.findOne({
    _id: req.params.id,
  })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyProduct = (req, res) => {
  const product = new Product({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    price: req.body.price,
    userId: req.body.userId,
    reduction: req.body.reduction,
    active: req.body.active,
  });
  Product.updateOne({ _id: req.params.id }, product)
    .then(() => {
      res.status(201).json({
        message: 'Product updated successfully!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteProduct = (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => {
      const filename = product.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Product.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Deleted' }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
