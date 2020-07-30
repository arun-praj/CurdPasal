const mongoose = require("mongoose");
const log = require("../utils/logHandler");
const connect = async () => {
   try {
      const conn = await mongoose.connect(
         process.env.MONGO_URI,
         {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
         },
         () => {
            log("Database Connected", "success");
            // console.log(`-->  Database Connected `.black.bold.underline.bgGreen);
         }
      );
   } catch (e) {
      log("Cannot connect to Database", "failed");
   }
};

module.exports = connect;
