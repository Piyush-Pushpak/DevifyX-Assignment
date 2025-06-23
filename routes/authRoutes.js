const express = require('express');
const { check } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Email is invalid').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('role', 'Invalid role').optional().isIn(['user', 'admin', 'moderator']),
  validateRequest, // ✅ THIS MUST BE INSIDE THE ARRAY
], register);

router.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').notEmpty(),
  validateRequest,
], login);

module.exports = router;
