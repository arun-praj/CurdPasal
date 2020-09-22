const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const listEndpoints = require("express-list-endpoints");
const volleyball = require("volleyball");
// const cookieSession = require("cookie-session");
const cors = require("cors");
const path = require("path");
const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
// const proxy = require("http-proxy-middleware");

//security
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

const connect = require("./config/DBConnect");
const log = require("./utils/logHandler");
const errorHandler = require("./middleware/error");

const app = express();

//load env variables
dotenv.config({
   path: "./config/config.env",
});

connect();

//file upload
app.use(
   fileupload({
      uriDecodeFileName: true,
   })
);

//MIDDLEWARES
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors()); //enables cors
// app.use(mongoSanitize()); //prevent SQL injection attacks ie. sanitize data
// app.use(xss()); //prevents cross site scriptiog(XSS) attacks
// app.use(hpp()); // prevents http parameter pollution
//rate limiting

// if (typeof process.env.CLOUDINARY_URL === "undefined") {
//    console.warn("!! cloudinary config is undefined !!");
//    console.warn("export CLOUDINARY_URL or set dotenv file");
// } else {
//    console.log("cloudinary config:");
//    console.log(cloudinary.config());
// }

const limiter = rateLimit({
   windowMs: 10 * 60 * 1000, //10 mins
   max: 10 * 60 * 60,
});
app.use(limiter);
if (process.env.NODE_ENV !== "production") {
   app.use(volleyball);
}
//Routes
app.use("/api/products", require("./routes/products"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/cart", require("./routes/cart"));

app.use("/api", (req, res, next) => {
   log(req);
   res.json({
      "🖥 Server Status": "Running...🙋‍♀️🙋‍♀️🙋‍♀️🙋‍♀️",
      Route: "ROUTE NOT FOUND",
      AvailableRoutes: listEndpoints(app),
   }).status(404);
   next();
});
if (process.env.NODE_ENV === "production") {
   app.use(express.static("client/build"));
   app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });
}

app.use(helmet()); //secure http headers

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => log(`Server started at port : ${PORT}`, "success"));

//HANDLE unhandled Promise Rejection
process.on("unhandledRejection", (reason, promise) => {
   console.log(`Error : ${reason.message}`.red.bold);
   // server.close(() => process.exit(1));
});
