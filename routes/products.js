const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
//Controllers
const {
   getProducts,
   getProduct,
   addProduct,
   productPhotoUpload,
} = require("../controllers/products");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", protect, addProduct);
router.put("/:id", protect, productPhotoUpload);

module.exports = router;
