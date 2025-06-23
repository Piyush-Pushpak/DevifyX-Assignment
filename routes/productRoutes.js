const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

router.use(protect);

router.post('/', authorize('admin', 'moderator'), createProduct);
router.put('/:id', authorize('admin', 'moderator'), updateProduct);
router.delete('/:id', authorize('admin'), deleteProduct);

module.exports = router;
