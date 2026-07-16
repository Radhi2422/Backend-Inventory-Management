const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },

    productReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    totalAmount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled"
      ],
      default: "Pending"
    },

    orderDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection:"Order",
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);