const fs = require('fs');
const path = require('path');

const logToFile = (message) => {
  const logPath = path.join(__dirname, '../logs/server.log');
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logPath, logMessage);
};

module.exports = logToFile;
