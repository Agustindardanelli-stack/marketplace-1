const express = require('express');
const { register, login } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();


router.post('/register', register);
router.post('/login', login);


router.get('/profile', authenticateToken, async (req, res) => {
  res.json({
    user: req.user 
  });
});


router.get('/verify-token', authenticateToken, (req, res) => {
  res.json({
    valid: true,
    user: req.user
  });
});

module.exports = router;