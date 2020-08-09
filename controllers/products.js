//ASYNC AND ERROR HANDLER
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

//MODELS
const Products = require("../models/Products");

//@description      Get all Products
//@Routes           GET /api/products
//@access           public
exports.getProducts = asyncHandler(async (req, res, next) => {
   const products = await Products.find();
   if (!products) {
      return next(new ErrorResponse(`No any product`, 400));
   }
   res.json({ success: true, data: products }).status(201);
});

//@description      Get single Product
//@Routes           GET /api/products/:id
//@access           public
exports.getProduct = asyncHandler(async (req, res, next) => {
   const product = await Products.findById(req.params.id);
   if (!product) {
      return next(new ErrorResponse(`Connot find product`, 400));
   }
   res.json({ success: true, data: product }).status(201);
});

//@description      Add a Product
//@Routes           POST /api/products
//@access           Private
exports.addProduct = asyncHandler(async (req, res, next) => {
   const newproduct = await Products.create(req.body);
   if (!newproduct) {
      return next(new ErrorResponse(`Connot Create product`, 400));
   }
   res.json({ msg: "Created new product", data: newproduct }).status(201);
});
