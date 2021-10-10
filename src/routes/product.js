const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');

router.post('/', ProductController.createProduct);

router.get('/:id', ProductController.getProduct);

router.put('/:id', ProductController.modifyProduct);

router.delete('/:id', ProductController.deleteProduct);

router.use('/', ProductController.getProducts);

module.exports = router;
