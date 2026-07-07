const express = require("express");
const authMiddleware=require("../middleware/authMiddleware.js");
const permissionMiddleware=require("../middleware/permissionMiddleware.js");

const router = express.Router();

const {
    createProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct
}

= require("../controllers/productController.js");
// router.get("/view",getProduct);//working 
router.get("/view",authMiddleware,permissionMiddleware("VIEW_PRODUCTS"),getProduct);//to be tested
// router.get("/:name", getProductById);
router.get("/:name",authMiddleware,permissionMiddleware("VIEW_PRODUCT_BYID"), getProductById);//to be tested
router.post("/add-product",authMiddleware,permissionMiddleware("ADD_PRODUCT"),createProduct);//working fine
// router.put("/update/:name",updateProduct);
router.put("/update/:name",authMiddleware,permissionMiddleware("UPDATE_PRODUCT"),updateProduct);
router.delete("/delete-product/:id",authMiddleware,permissionMiddleware("DELETE_PRODUCT"),deleteProduct);

module.exports = router;