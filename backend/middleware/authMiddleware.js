import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { verifyToken } from '../utils/utils.js';

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = verifyToken(token);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
