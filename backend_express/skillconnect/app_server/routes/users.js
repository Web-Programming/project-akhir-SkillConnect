const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UserProfile = require('../models/userProfile');

router.get('/profile', async (req, res) => {
  try {
    // Debug authentication
    console.log('Full req.user object:', req.user);
    
    // Pastikan req.user ada
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Coba gunakan req.user._id jika userId tidak ada
    const userId = req.user.userId || req.user._id;
    console.log('Using userId:', userId);
    
    const userProfile = await UserProfile.findOne({ user: userId });
    console.log('Found profile:', userProfile);
    
    if (!userProfile) {
      console.log('Creating new profile...');
      // Gunakan userId yang sama untuk mencari user
      const user = await User.findById(userId);
      console.log('Found user:', user);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const newProfile = new UserProfile({
        user: userId,
        name: user.name,
        email: user.email
      });

      const savedProfile = await newProfile.save();
      console.log('New profile created:', savedProfile);
      
      return res.json({
        success: true,
        data: savedProfile
      });
    }

    res.json({
      success: true,
      data: userProfile
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
});

module.exports = router;