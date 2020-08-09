const ErrorResponse = require("../utils/errorResponse");

//Status Code
/*
   400 - Bad Request
   404 - Not found
   200 - OK
   201 - Success
*/

const errorHandler = (err, req, res, next) => {
   let error = { ...err };
   error.message = err.message;
   // console.log(err.message.red.underline);

   //Mongoose Bad Objectid
   if (err.name === "CastError") {
      const message = ` [Error] Bootcamp not found with ID: ${error.value}`;
      error = new ErrorResponse(message, 404);
   }

   //Mongoose Duplicate Key
   if (err.code === 11000) {
      const message = "Email already Exist. Please Login";
      error = new ErrorResponse(message, 400);
   }

   //Mongoose Vaidation Error
   if (err.name === "ValidationError") {
      console.log(err.errors);
      const message = Object.values(err.errors).map((val) => val.message);
      error = new ErrorResponse(message, 400);
   }

   res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
   });
};
module.exports = errorHandler;
