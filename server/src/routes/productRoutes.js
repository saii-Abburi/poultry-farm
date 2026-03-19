const express = require('express');
const {
    getProducts,
    getProductsByCategory,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(protect, upload.fields([{ name: 'images' }, { name: 'video', maxCount: 1 }]), createProduct);

router.get('/category/:category', getProductsByCategory);

router.route('/:id')
    .get(getProductById)
    .put(protect, upload.fields([{ name: 'images' }, { name: 'video', maxCount: 1 }]), updateProduct)
    .delete(protect, deleteProduct);

module.exports = router;
