//ASYNC AND ERROR HANDLER
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

//MODELS
const Products = require("../models/Products");
const User = require("../models/User");
const Review = require("../models/Review");

//@description      Get reviews
//@Routes           GET /api/reviews
//@Routes           GET /api/reviews/:productId
//@access           public
exports.getReviews = asyncHandler(async (req, res, next) => {
   if (req.params.productId) {
      const reviews = await Review.find({
         product: req.params.productId,
      });
      return res.status(200).json({
         success: true,
         count: reviews.count,
         data: reviews,
      });
   }
   const reviews = await Review.find();
   res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
   });
});

//@description      Get reviews
//@Routes           POST /api/reviews/:productId
//@access           private
exports.addReviews = asyncHandler(async (req, res, next) => {
   req.body.product = req.params.productId;
   req.body.user = req.user.id;
   console.log("THis is it", req.params.productId);
   const product = await Products.findById(req.params.productId);
   if (!product) {
      return next(new ErrorResponse(`Product with ${req.params.productId} not found`, 404));
   }
   const findReview = await Review.findOne({
      product: req.params.productId,
      user: req.user.id,
   });

   if (findReview) {
      return next(new ErrorResponse(`User already has review on this prodcut`, 500));
   }

   const review = await Review.create(req.body);

   res.status(201).json({
      count: review.length,
      success: true,
      data: review,
   });
});

//@description      Update Review
//@Routes           PUT /api/reviews/:reviewId
//@access           private
exports.updateReviews = asyncHandler(async (req, res, next) => {
   const id = req.params.reviewId;

   const review = await Review.findById(id);
   if (!review) {
      return next(new ErrorResponse(`Review with ${id} not found`, 404));
   }
   //make sure review belongs to user
   if (req.user.id !== review.user.toString()) {
      return next(new ErrorResponse(`User unaurhorized to update this review`, 401));
   }

   const updatedReview = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
   });

   res.status(201).json({
      success: true,
      data: updatedReview,
   });
});

//@description      Delete Review
//@Routes           Delete /api/reviews/:reviewId
//@access           private
exports.deleteReviews = asyncHandler(async (req, res, next) => {
   const id = req.params.reviewId;

   const review = await Review.findById(id);
   if (!review) {
      return next(new ErrorResponse(`Review with ${id} not found`, 404));
   }
   //make sure review belongs to user
   if (req.user.id !== review.user.toString()) {
      return next(new ErrorResponse(`User unaurhorized to update this review`, 401));
   }

   review.remove();

   res.status(200).json({
      success: true,
      data: {},
   });
});
