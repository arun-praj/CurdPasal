const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const { register, login, getMe, loginWithGoogle, getCustomers } = require("../controllers/auth");

//Controllers
router.get("/me", protect, getMe);
router.post("/google", loginWithGoogle);
router.post("/register", register);
router.post("/login", login);

router.get("/customers", getCustomers);

module.exports = router;
