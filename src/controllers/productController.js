const product =
require("../models/productSchema.js");

exports.createProduct =
async(req,res)=>{

    const Product =
        await product.create(req.body);
    res.status(201).json(Product);
};

exports.getProduct = async (req, res) => {
  try {
    const products = await product.find({});
    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct =
        await product.find({
           name: req.query.name
});

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getProductById =
async(req,res)=>{
    const Product =
        await product.find({
           name: req.query.name
});

    res.json(Product);
};

exports.deleteProduct =
async(req,res)=>{

    await product.findByIdAndDelete(
        req.params.id
    );

    res.json({
        message:"Product deleted"
    });
};