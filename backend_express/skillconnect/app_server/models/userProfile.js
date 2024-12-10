const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  bio: String,
  photoUrl: String
}, {
  timestamps: true
});

module.exports = mongoose.models.UserProfile || mongoose.model('UserProfile', userProfileSchema);

