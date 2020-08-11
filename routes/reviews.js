const express = require("express");
const router = express.Router();
const { getReviews, addReviews, updateReviews, deleteReviews } = require("../controllers/reviews");
const { protect } = require("../middleware/auth");
//Controllers
router.get("/", getReviews);
router.get("/:productId", getReviews);
router.post("/:productId", protect, addReviews);
router.put("/:reviewId", protect, updateReviews);
router.delete("/:reviewId", protect, deleteReviews);

module.exports = router;
