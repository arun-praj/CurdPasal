const express = require("express");
const router = express.Router();

//Controllers
const { getProducts, getProduct, addProduct } = require("../controllers/products");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", addProduct);

module.exports = router;
