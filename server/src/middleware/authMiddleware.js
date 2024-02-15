import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import Users from "../models/user.js"


const protect = asyncHandler(async (req, res, next) => {
    let token;

    console.log(req.cookies);

    token = req.cookies.jwt;
  
    if (token) {

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
        req.user = await Users.findById(decoded.userId).select('-password');
  
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    } 
    else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  });
  
  export { protect };