const express = require('express');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// RUTAS PÚBLICAS (sin autenticación)
router.get('/', getAllCategories);           
router.get('/:id', getCategoryById);         

// RUTAS PROTEGIDAS (solo admins)
router.post('/', authenticateToken, requireAdmin, createCategory);       
router.put('/:id', authenticateToken, requireAdmin, updateCategory);     
router.delete('/:id', authenticateToken, requireAdmin, deleteCategory);  

module.exports = router;