const jwt = require('jsonwebtoken');
const cors = require('cors');

const auth = async (req, res, next) => {
  try {
    // Menerima token dari berbagai kemungkinan header
    const token = req.header('Authorization')?.replace('Bearer ', '') || 
                 req.header('x-auth-token') ||
                 req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Akses ditolak. Token tidak ditemukan.'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        userId: decoded.userId || decoded._id,
        email: decoded.email,
        role: decoded.role
      };
      next();
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak valid atau kadaluarsa'
      });
    }
    
  } catch (error) {
    console.error('Auth error:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: 'Kesalahan server saat autentikasi',
      error: error.message
    });
  }
};

module.exports = auth;