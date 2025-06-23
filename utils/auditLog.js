const AuditLog = require('../models/AuditLog');

const saveAuditLog = async (user, action, details, req) => {
  try {
    await AuditLog.create({
      user: user._id,
      action,
      details,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });
  } catch (err) {
    console.error('Audit log error:', err.message);
  }
};

module.exports = saveAuditLog;