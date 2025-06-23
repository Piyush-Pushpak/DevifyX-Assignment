const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const saveAuditLog = require('../utils/auditLog');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Prevent duplicate email/username logic (already in place)
    const user = await User.create({ name, email, password, role });

    // ✅ Send welcome email
    await sendEmail({
      to: user.email,
      subject: 'Welcome to Admin Dashboard',
      text: `Hello ${user.name},\n\nWelcome to the Admin Dashboard! Your account has been successfully created.\n\nBest regards,\nAdmin Team`
    });

    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    await saveAuditLog(user, 'login', 'User logged in', req);
    res.json({ user, token });
  } catch (err) {
    next(err);
  }
};
