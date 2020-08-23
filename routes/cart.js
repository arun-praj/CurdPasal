const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
//Controllers
const { addToCart, getCart, getProductFromCart } = require("../controllers/cart");

router.post("/", protect, addToCart);
router.get("/", protect, protect, getCart);
router.get("/:productId", protect, getProductFromCart);

module.exports = router;
