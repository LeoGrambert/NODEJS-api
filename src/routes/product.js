const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');
const auth = require('../middleware/auth');

router.post('/', auth, ProductController.createProduct);

router.get('/:id', auth, ProductController.getProduct);

router.put('/:id', auth, ProductController.modifyProduct);

router.delete('/:id', auth, ProductController.deleteProduct);

router.use('/', auth, ProductController.getProducts);

module.exports = router;
