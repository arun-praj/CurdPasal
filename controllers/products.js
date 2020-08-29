//ASYNC AND ERROR HANDLER
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const path = require("path");
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

//@description      Upload Product pricture
//@Routes           PUT /api/products/:id
//@access           Private
exports.productPhotoUpload = asyncHandler(async (req, res, next) => {
   const product = await Products.findById(req.params.id);
   if (!product) {
      return next(new ErrorResponse(`Product not found`, 404));
   }
   if (!req.files) {
      return next(new ErrorResponse(`Please Upload a file`, 400));
   }
   const file = req.files.file;
   // Make sure file is photo
   if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse(`Please select an image.`, 400));
   }
   //check file size
   if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
         new ErrorResponse(`File size cannot be greater than ${process.env.MAX_FILE_UPLOAD}.`, 400)
      );
   }
   //create custom name
   file.name = `product_${product._id}${path.parse(file.name).ext}`;

   file.mv(`${process.env.PRODUCT_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
         console.log(err);
         new ErrorResponse(`Problem with file upload`, 500);
      }
      await Products.findByIdAndUpdate(req.params.id, { photo: file.name });
   });
   console.log(file.name);
   res.json({ msg: "Upload Successful", data: file.name }).status(201);
});
