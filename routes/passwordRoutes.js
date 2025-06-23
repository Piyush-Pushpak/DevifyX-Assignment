const express = require('express');
const {
  forgotPassword,
  resetPassword,
  changePassword
} = require('../controllers/passwordController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/password/forgot → generate and log reset token
router.post('/forgot', forgotPassword);

// POST /api/password/reset/:token → set new password with token
router.post('/reset/:token', resetPassword);

// PUT /api/password/change → user must be logged in (JWT)
router.put('/change', protect, changePassword);

module.exports = router;
