const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} = require('../controllers/cartController');


router.use(authenticateToken);


router.get('/', getCart);


router.post('/add', addToCart);


router.put('/item/:id', updateCartItem);


router.delete('/item/:id', removeCartItem);


router.delete('/', clearCart);

module.exports = router;