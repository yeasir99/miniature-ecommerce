import jwt from 'jsonwebtoken';

const createToken = user => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '12h',
  });
};

const verifyToken = token => jwt.verify(token, process.env.JWT_SECRET);

export { createToken, verifyToken };
