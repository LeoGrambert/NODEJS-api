const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');
const auth = require('../middleware/auth');

router.post('/', auth, ProductController.createProduct);

router.get('/:id', ProductController.getProduct);

router.put('/:id', auth, ProductController.modifyProduct);

router.delete('/:id', auth, ProductController.deleteProduct);

router.use('/', ProductController.getProducts);

module.exports = router;
