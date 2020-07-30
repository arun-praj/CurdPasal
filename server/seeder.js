const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const connect = require("./config/DBConnect");
const dotenv = require("dotenv");

//model
const Products = require("./models/Products");
dotenv.config({
   path: "./config/config.env",
});

connect();

const importProducts = async () => {
   const data = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`, "utf-8"));
   try {
      await Products.create(data);
      console.log("Data Impoted to DB");
      process.exit();
   } catch (e) {
      console.log(e);
      process.exit();
   }
};
importProducts();
