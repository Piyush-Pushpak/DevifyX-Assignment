const User = require('../models/User');
const saveAuditLog = require('../utils/auditLog');

// Get all users (with filtering and pagination) — Admin Only
exports.getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    const query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    };

    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .select('-password');

    const total = await User.countDocuments(query);

    res.json({ total, page, users });
  } catch (err) {
    next(err);
  }
};

// Get user by ID — Only admin or the user themselves
exports.getUserById = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin' && req.user._id !== req.params.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Update user — Only admin or the user themselves
exports.updateUser = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin' && req.user._id !== req.params.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { name, email, role } = req.body;
    const updates = { name, email };

    // Only admin can update roles
    if (req.user.role === 'admin' && role) {
      updates.role = role;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    await saveAuditLog(req.user, 'update user', `Updated user ${user._id}`, req);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Delete user — Admin Only
exports.deleteUser = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await saveAuditLog(req.user, 'delete user', `Deleted user ${user._id}`, req);
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};
