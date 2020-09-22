//ASYNC AND ERROR HANDLER
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const path = require("path");
const cloudinary = require("../utils/cloudnary");
// const cloudinary = require("cloudinary").v2;
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
   res.json({ success: true, data: products, count: products.length }).status(201);
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

//@description      get Products images
//@Routes           POST /api/products/images
//@access           Private
exports.getProductsImages = asyncHandler(async (req, res, next) => {
   const response = await cloudinary.search
      .expression("folder:Dhaushop_products")
      .max_results(30)
      .execute()
      .then((result) => console.log(result));
   res.json({ msg: "success" });
});

//@description      Add a Product
//@Routes           POST /api/products
//@access           Private
exports.addProduct = asyncHandler(async (req, res, next) => {
   const product = await Products.findOneAndUpdate(
      {
         name: req.body.name,
      },
      req.body,
      {
         new: true,
         upsert: true, // if not found then create new product using filter and update value
         rawResult: true,
         runValidators: true,
      }
   );

   if (!product) {
      return next(new ErrorResponse(`Connot Create product`, 400));
   }
   res.json({ msg: "Updated product", data: product }).status(201);
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
   //upload image to cloudnary
   try {
      const eager_options = {
         width: 200,
         height: 200,
         crop: "scale",
         format: "jpg",
      };
      const fileName = file.name.split(".")[0];
      console.log(fileName);

      const uploadResponse = await cloudinary.uploader.upload(
         `${process.env.PRODUCT_UPLOAD_PATH}/${file.name}`,
         {
            public_id: `dhaushop_products/${fileName}`,
            // use_filename: true,
            // folder: "Dhaushop_products",
            eager: eager_options,
         }
      );
   } catch (e) {
      console.log("Upload to clounary failed", e);
      return res.json({ msg: "Upload to clounary failed", error: e }).status(201);
   }

   res.json({ msg: "Upload Successful", data: file.name }).status(201);
});
