console.log('Testing mongoose require...');
try {
  const mongoose = require('mongoose');
  console.log('Mongoose version:', mongoose.version);
} catch (error) {
  console.error('Require error:', error);
}