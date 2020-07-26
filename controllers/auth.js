const mongoose = require("mongoose");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
   //Create/Sign Token from User model

   const token = user.getSignedJwt();
   const options = {
      //30days
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 23 * 60 * 60 * 1000),
      httpOnly: true,
   };
   if (process.env.NODE_ENV === "PRODUCTION") {
      options.secure = true;
   }
   res.status(statusCode).cookie("token", token, options).json({
      success: true,
      token,
   });
};

exports.register = asyncHandler(async (req, res, next) => {
   const { name, email, password, address, contact } = req.body;
   const user = await User.create({ name, email, password, address, contact });

   sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
   const { email, password } = req.body;
   if (!email || !password) {
      return next(new ErrorResponse("Please complete above form", 401));
   }
   const user = await User.findOne({ email }).select("+password");
   if (!user) {
      return next(new ErrorResponse("Please complete above form", 401));
   }
   const isMatched = await user.matchPassword(password);

   if (!isMatched) {
      return next(new ErrorResponse("Invalid Email or password", 401));
   }
   sendTokenResponse(user, 200, res);
});
