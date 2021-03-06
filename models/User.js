const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: [true, "Name is Required"],
      minlength: 2,
   },
   lastName: {
      type: String,
      minlength: 2,
      required: [true, "Name is Required"],
   },
   email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"],
   },
   verified: {
      type: Boolean,
      // default: false,
   },
   googleId: {
      type: String,
      unique: true,
   },
   status: {
      type: "String",
      enum: ["active", "deactivated"],
      default: "active",
   },
   role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
   },
   password: {
      type: String,
      // required: [true, "Please add a Password"],
      minlength: 6,
      select: false, // When we get a user its not gonna return password
   },
   city: {
      type: String,
      // required: [true, "Please add an address"],
   },
   points: {
      type: [Number],
   },
   contact: {
      type: Number,
      minlength: 10,
      // required: true,
   },

   photo: {
      type: String,
      default: "user-photo.jpg",
   },
   resetPasswordToken: {
      type: String,
      resetPasswordExpire: Date,
      createAt: {
         type: Date,
         default: Date.now,
      },
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

// UserSchema.pre("save", async function (next) {
//    const salt = await bcrypt.genSalt(10);
//    this.password = await bcrypt.hash(this.password, salt);
// });

//Sign jwt and return token
UserSchema.methods.getSignedJwt = function () {
   return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
   });
};

UserSchema.methods.matchPassword = async function (password) {
   return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
