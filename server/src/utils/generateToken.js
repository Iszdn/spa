import jwt from 'jsonwebtoken';

const generateToken = (req,res, userId,email,username,role) => {
  const token = jwt.sign({ userId,email,username,role }, process.env.JWT_SECRET_KEY, {
    expiresIn: '30d',
  });

  req.token=token

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;