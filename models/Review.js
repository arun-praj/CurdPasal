const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, "Please add a title for a review"],
      minlength: 2,
      maxlength: 150,
   },
   text: {
      type: String,
      required: [true, "Please add some text"],
      minlength: 2,
      maxlength: 150,
   },
   rating: {
      type: Number,
      min: 1,
      max: 10,
      required: [true, "Please add a rating"],
   },
   user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
   },
   product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

//prevent user for submiting 1 review
ReviewSchema.index(
   {
      user: 1,
      product: 1,
   },
   {
      unique: true,
   }
);

//static method to get avg rating and save

ReviewSchema.statics.getAverageRating = async function (productId) {
   const obj = await this.aggregate([
      {
         $match: { product: productId },
      },
      {
         $group: {
            _id: "$product",
            averageRating: { $avg: "$rating" },
         },
      },
   ]);
   console.log(obj);
   try {
      await this.model("Products").findByIdAndUpdate(productId, {
         averageRating: obj[0].averageRating,
      });
   } catch (e) {
      console.log(e);
   }
};

ReviewSchema.pre("save", function () {
   this.constructor.getAverageRating(this.product);
});
ReviewSchema.pre("remove", function () {
   this.constructor.getAverageRating(this.product);
});

module.exports = mongoose.model("Review", ReviewSchema);
