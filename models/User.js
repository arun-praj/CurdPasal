const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Name is Required"],
   },
   email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"],
   },
   role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
   },
   password: {
      type: String,
      required: [true, "Please add a Password"],
      minlength: 6,
      select: false, // When we get a user its not gonna return password
   },
   address: {
      type: String,
      required: [true, "Please add an address"],
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

UserSchema.pre("save", async function (next) {
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});
