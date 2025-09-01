const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// RUTAS PÚBLICAS (sin autenticación)
router.get('/', getAllProducts);           // GET /api/products
router.get('/:id', getProductById);        // GET /api/products/:id

// RUTAS PROTEGIDAS (solo admins)
router.post('/', authenticateToken, requireAdmin, createProduct);       // POST /api/products
router.put('/:id', authenticateToken, requireAdmin, updateProduct);     // PUT /api/products/:id  
router.delete('/:id', authenticateToken, requireAdmin, deleteProduct);  // DELETE /api/products/:id

module.exports = router;