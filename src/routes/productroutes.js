const express = require("express");
const authMiddleware=require("../middleware/authMiddleware.js");
const permissionMiddleware=require("../middleware/permissionMiddleware.js");

const router = express.Router();
const upload=require("../middleware/upload");
const {
    createProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct
}

= require("../controllers/productController.js");
// router.get("/view",getProduct);//working 
router.get("/view",getProduct);//to be tested
// router.get("/:name", getProductById);
router.get("/:name",authMiddleware,permissionMiddleware("VIEW_PRODUCT_BYID"), getProductById);//to be tested
router.post("/add-product",upload.fields([
        { name: "mainImage", maxCount: 1 },
        { name: "galleryImages", maxCount: 10 }
    ]),createProduct);//working fine

// router.post("/add-product",authMiddleware,permissionMiddleware("ADD_PRODUCT"),createProduct);//working fine
// router.put("/update/:name",updateProduct);
router.put("/update/:name",authMiddleware,permissionMiddleware("UPDATE_PRODUCT"),updateProduct);
router.delete("/delete-product/:id",authMiddleware,permissionMiddleware("DELETE_PRODUCT"),deleteProduct);

module.exports = router;