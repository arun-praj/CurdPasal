const colors = require("colors");
const log = (msg, type) => {
   if (type === "success")
      console.log(
         `-->  SUCCESS 😇: `.black.bold.underline.bgGreen + `${msg}`.black.underline.bgGreen
      );
   else if (type === "failed")
      console.log(`-->  FAILED 😡 : `.black.bold.underline.bgRed + `${msg}`.black.underline.bgRed);
};
module.exports = log;
