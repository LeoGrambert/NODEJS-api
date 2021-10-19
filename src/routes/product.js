const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');
const auth = require('../middleware/auth');
const multer = require('multer');

router.post('/', auth, multer, ProductController.createProduct);

router.get('/:id', ProductController.getProduct);

router.put('/:id', auth, multer, ProductController.modifyProduct);

router.delete('/:id', auth, ProductController.deleteProduct);

router.get('/', ProductController.getProducts);

module.exports = router;
