const crypto = require('crypto');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

// Forgot Password
exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins

    user.resetToken = resetToken;
    user.resetTokenExpire = resetPasswordExpire;
    await user.save();

    const resetUrl = `${req.protocol}://${req.get('host')}/api/password/reset/${resetToken}`;

    // ✅ Send Mailtrap email
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click here to reset: ${resetUrl}`
    });

    res.json({ message: 'Password reset email sent successfully' });
  } catch (err) {
    next(err);
  }
};

// Reset Password
exports.resetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpire: { $gt: Date.now() }
    });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = req.body.password;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    // ✅ Send password reset confirmation email
    await sendEmail({
      to: user.email,
      subject: 'Your password has been reset',
      text: `Hi ${user.name},\n\nYour password was successfully reset. If this wasn’t you, please contact support immediately.`
    });

    const token = generateToken(user);
    res.json({ message: 'Password reset successful', token });
  } catch (err) {
    next(err);
  }
};


// Change Password (Logged-in User)
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new password are required' });
    }

    const user = await User.findById(req.user._id);
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect current password' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    next(err);
  }
};
