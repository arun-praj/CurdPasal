const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
//Controllers
const { getProducts, getProduct, addProduct } = require("../controllers/products");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", protect, addProduct);

module.exports = router;
