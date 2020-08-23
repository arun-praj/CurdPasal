const mongoose = require("mongoose");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//models
const User = require("../models/User");
const Cart = require("../models/Cart");

//@description      Add to cart
//@Routes           POST /api/cart
//@access           private
exports.addToCart = asyncHandler(async (req, res, next) => {
   const { productId, quantity, name, price } = req.body.products;
   const userId = req.user._id;
   console.log(req.body.products, req.user.id);
   try {
      let cart = await Cart.findOne({
         userId: userId,
      });
      //if cart exist for current user
      if (cart) {
         //find index of product Id
         let itemIndex = cart.products.findIndex((p) => p.productId == productId);
         //if prodcut exists in cart
         if (itemIndex > -1) {
            let productItem = cart.products[itemIndex];
            productItem.quantity = quantity;
            cart.products[itemIndex] = productItem;
         } else {
            //if product does not exist then
            cart.products.push({ productId, quantity, name, price });
         }
         cart = await cart.save();
         return res.status(201).json({
            success: true,
            msg: "Cart Updated",
            data: cart,
         });
      } else {
         const newCart = await Cart.create({
            userId,
            products: [{ productId, quantity, name, price }],
         });
         return res.status(201).json({
            success: true,
            msg: "Added to Cart",
            data: newCart,
         });
      }
   } catch (e) {
      return next(new ErrorResponse("Something went wrong", 400));
   }
});

//@description      GET cart for a user
//@Routes           GET /api/cart
//@access           private
exports.getCart = asyncHandler(async (req, res, next) => {
   const userId = req.user._id;
   if (userId) {
      try {
         const cart = await Cart.findOne({
            userId: userId,
         });
         if (cart) {
            res.status(200).json({
               success: true,
               count: cart.products.length,
               data: cart,
            });
         } else {
            res.status(200).json({
               success: true,
               count: 0,
               data: {},
            });
         }
      } catch (e) {
         return next(new ErrorResponse("Something went wrong", 400));
      }
   } else {
      return next(new ErrorResponse("Login to see your cart", 204));
   }
});

//@description      Find product in an array of object
//@Routes           GET /api/cart/find
//@access           private

exports.getProductFromCart = asyncHandler(async (req, res, next) => {
   const userId = req.user._id;
   const productId = req.params.productId;
   console.log(productId);
   console.log(userId);

   try {
      var product = await Cart.find({
         userId: userId,
         "products.productId": productId,
      });
      if (product) {
         res.status(200).json({
            success: true,
            count: product[0].products.length,
            data: product,
         });
      } else {
         res.json({
            success: true,
            data: [],
         }).status(204);
      }
   } catch (e) {
      console.log(e);
      return next(new ErrorResponse("Something went wrong", 400));
   }
});
