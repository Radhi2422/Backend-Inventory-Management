const express = require("express");
const router = express.Router();
console.log("hii");
const validateRegister=require("../middleware/validateMiddleware.js");
const authController =require("../controllers/authController");

router.post("/login", authController.login);
router.post("/register", validateRegister,authController.register);

module.exports = router;