console.log('Current working directory:', process.cwd());
console.log('Looking for mongoose in:', require.resolve.paths('mongoose'));
const mongoose = require('mongoose');
console.log('Mongoose loaded successfully:', mongoose.version);

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Student', studentSchema);
