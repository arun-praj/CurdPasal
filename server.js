const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const listEndpoints = require("express-list-endpoints");
const volleyball = require("volleyball");
const cookieSession = require("cookie-session");
const cors = require("cors");
const path = require("path");
const proxy = require("http-proxy-middleware");
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
module.exports = function (app) {
   // add other server routes to path array
   app.use(proxy(["/api"], { target: "http://localhost:8000" }));
};

//MIDDLEWARES
app.use(express.json());

app.use(cors()); //enables cors
app.use(mongoSanitize()); //prevent SQL injection attacks ie. sanitize data
app.use(helmet()); //secure http headers
app.use(xss()); //prevents cross site scriptiog(XSS) attacks
app.use(hpp()); // prevents http parameter pollution

//rate limiting
const limiter = rateLimit({
   windowMs: 10 * 60 * 1000, //10 mins
   max: 10000,
});
app.use(limiter);
if (process.env.NODE_ENV !== "production") {
   app.use(volleyball);
}
app.use(
   cookieSession({
      // milliseconds of a da y
      name: "google",
      maxAge: 24 * 60 * 60 * 1000,
      keys: [process.env.COOKIE_KEY],
   })
);

//Routes
app.use("/api/products", require("./routes/products"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/auth/", require("./routes/auth"));

app.use("/", (req, res, next) => {
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

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => log(`Server started at port : ${PORT}`, "success"));

//HANDLE unhandled Promise Rejection
process.on("unhandledRejection", (reason, promise) => {
   console.log(`Error : ${reason.message}`.red.bold);
   // server.close(() => process.exit(1));
});
