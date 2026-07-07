const express = require("express");
const router = express.Router();

const authMiddleware=require("../middleware/authMiddleware.js");
const permissionMiddleware=require("../middleware/permissionMiddleware.js");

const authController =
require("../controllers/authController");

router.post("/login", authController.login);

module.exports = router;