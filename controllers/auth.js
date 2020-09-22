const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//Get token from model, and send response
const sendTokenResponse = (user, statusCode, res) => {
   //Create/Sign Token from User model

   const token = user.getSignedJwt();

   res.status(statusCode).json({
      success: true,
      token,
      data: user,
   });
};

//@description      Register new User
//@Routes           GET /api/auth/google
//@access           public
exports.loginWithGoogle = asyncHandler(async (req, res, next) => {
   const { email, googleId, imageUrl, familyName, givenName } = req.body;
   const user = await User.findOne({
      email,
   });
   if (user) {
      sendTokenResponse(user, 200, res);
   } else {
      const newUser = await User.create({
         googleId,
         firstName: givenName,
         lastName: familyName,
         email,
         photo: imageUrl,
         verified: true,
      });
      sendTokenResponse(newUser, 200, res);
   }
});

//@description      Register new User
//@Routes           GET /api/auth/register
//@access           public
exports.register = asyncHandler(async (req, res, next) => {
   // const { name, email, password, address, contact, points } = req.body;

   //encrypt the password
   const password = req.body.password;
   const salt = await bcrypt.genSalt(10);
   req.body.password = await bcrypt.hash(password, salt);
   req.body.googleId = `No googleId ${req.body.email}`;
   const user = await User.create(req.body);

   sendTokenResponse(user, 200, res);
});

//@description      User login
//@Routes           GET /api/auth/login
//@access           public
exports.login = asyncHandler(async (req, res, next) => {
   const { email, password } = req.body;
   if (!email || !password) {
      return next(new ErrorResponse("lease complete above form", 401));
   }
   const user = await User.findOne({ email }).select("+password");
   console.log(user);
   if (user.email && !user.password) {
      return next(
         new ErrorResponse("User account is associated with google. Please login with google", 401)
      );
   }
   if (!user) {
      return next(new ErrorResponse("Invalid Email or password", 401));
   }
   const isMatched = await user.matchPassword(password);

   if (!isMatched) {
      return next(new ErrorResponse("Invalid Email or password", 401));
   }
   sendTokenResponse(user, 200, res);
});

//@description      Get current logged in user
//@Routes           GET /api/auth/me
//@access           private
exports.getMe = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.user.id);
   console.log(user);
   if (user) {
      res.status(200).json({
         success: true,
         data: user,
      });
   } else {
      res.status(404).json({
         success: false,
         msg: "No such user",
      });
   }
});

exports.getCustomers = asyncHandler(async (req, res, next) => {
   const customers = await User.find();
   console.log(customers);
   if (!customers) {
      return next(new ErrorResponse(`Empty Customers`, 204));
   }
   res.json({
      success: true,
      count: customers.length,
      data: customers,
   }).status(200);
});

exports.updateCustomer = asyncHandler(async (req, res, next) => {
   if (req.body.email) {
      delete req.body.email;
   }
   const updatedCustomer = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
   });
   if (!updatedCustomer) {
      return next(new ErrorResponse(`Cannot update Product`, 401));
   } else {
      res.json({
         success: true,
         data: updatedCustomer,
      }).status(200);
   }
});
