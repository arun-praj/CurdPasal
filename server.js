const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const listEndpoints = require("express-list-endpoints");
const volleyball = require("volleyball");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const cors = require("cors");
const path = require("path");

const connect = require("./config/DBConnect");
const log = require("./utils/logHandler");
const errorHandler = require("./middleware/error");

const app = express();

//load env variables
dotenv.config({
   path: "./config/config.env",
});

connect();

if (process.env.NODE_ENV === "production") {
   app.use(express.static("client/build"));
   app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });
}

//MIDDLEWARES
// @DESC         Body-parser
app.all("/*", function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   next();
});
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
   app.use(volleyball);
}

app.use(cookieParser());
app.use(cors());
// app.options("*", cors());
app.use(
   cookieSession({
      // milliseconds of a day
      name: "google",
      maxAge: 24 * 60 * 60 * 1000,
      keys: [process.env.COOKIE_KEY],
   })
);

//Routes
app.use("/api/products", require("./routes/products"));
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

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => log(`Server started at port : ${PORT}`, "success"));

//HANDLE unhandled Promise Rejection
process.on("unhandledRejection", (reason, promise) => {
   console.log(`Error : ${reason.message}`.red.bold);
   server.close(() => process.exit(1));
});
