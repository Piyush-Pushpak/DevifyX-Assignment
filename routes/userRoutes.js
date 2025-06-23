const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { checkAdmin } = require('../middlewares/roleMiddleware');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

// ✅ Admin-only: Get all users
router.get('/', protect, checkAdmin, getAllUsers);

// ✅ Admin-only: Delete user
router.delete('/:id', protect, checkAdmin, deleteUser);

// ✅ Accessible by admin or user themselves (if logic supports it)
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);

module.exports = router;
