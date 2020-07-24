const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Name is Required"],
      unique: true,
      minlength: [3, "Name cannot be less than 3 characters"],
      maxlength: [50, "Name can not be more than 50 characters"],
   },
   slug: String,
   description: {
      type: String,
      required: [true, "Description is Required"],
      maxlength: [500, "Description can not be more than 500 characters"],
   },
   price: {
      type: Number,
      required: [true, "Price is Required"],
   },
   category: {
      type: String,
      required: [true, "Category is Required"],
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   stock: {
      type: Number,
      required: [true, "Stock is Required"],
      default: 0,
   },
   quantitySold: {
      type: Number,
      default: 0,
   },
   sizes: {
      type: [Number],
      required: [true, "Size is Required"],
      default: 0,
   },
   photo: {
      type: String,
      default: "no-photo.jpg",
   },
   averageRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [10, "Rating must can not be more than 10"],
   },
});

module.exports = mongoose.model("Products", productSchema);
