const jwt = require("jsonwebtoken");

const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
   let token;
   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
   }
   console.log("token:", token);
   //Make sure token exists
   if (!token) {
      return next(new ErrorResponse("User not authorized to access this route", "401"));
   }
   //verify token
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
   } catch (e) {
      return next(new ErrorResponse("User verification failed", "401"));
   }
});
