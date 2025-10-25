const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

 
const protect = async (req, res, next) => {
  try {
    let token;

    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
 
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided'
      });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

     
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }
 
    if (user.role === 'DOCTOR') {
      const doctor = await prisma.doctor.findFirst({
        where: { email: user.email }
      });
      user.doctorId = doctor?.id;
    }

     
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed'
    });
  }
};
 
const restrictTo = (...roles) => {
  return (req, res, next) => {
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. This action requires one of the following roles: ${roles.join(', ')}`
      });
    }
    next();
  };
};

module.exports = { protect, restrictTo };