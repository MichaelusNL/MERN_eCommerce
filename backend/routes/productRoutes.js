import express from 'express'
const router = express.Router()
import {
  getProductById,
  getProducts,
  getTopProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  deleteProductReview,
} from '../controllers/productController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, isAdmin, createProduct)
router.route('/:id/reviews/:reviewId').delete(protect, deleteProductReview)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct)

export default router
