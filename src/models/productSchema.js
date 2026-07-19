const mongoose = require("mongoose");

const specificationSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true
    },
    value: {
      type: String,
      required: true,
      trim: true
    }
  },
  { _id: false }
);

const variantSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      trim: true
    },
    size: {
      type: String,
      trim: true
    },
    sku: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      min: 0
    },
    stock: {
      type: Number,
      default: 0,
      min: 0
    },
    image: {
      type: String
    }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    // ===========================
    // Basic Information
    // ===========================

    productName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },

    barcode: {
      type: String,
      trim: true
    },

    brand: {
      type: String,
      trim: true
    },

    category: {
      type: String,
      required: true
    },

    subCategory: {
      type: String
    },

    shortDescription: {
      type: String,
      maxlength: 250
    },

    description: {
      type: String,
      required: true
    },

    // ===========================
    // Pricing
    // ===========================

    pricing: {
      mrp: {
        type: Number,
        required: true,
        min: 0
      },

      sellingPrice: {
        type: Number,
        required: true,
        min: 0
      },

      costPrice: {
        type: Number,
        default: 0,
        min: 0
      },

      discountType: {
        type: String,
        enum: ["Percentage", "Fixed", ""],
        default: ""
      },

      discountValue: {
        type: Number,
        default: 0
      },

      tax: {
        type: Number,
        default: 0
      },

      currency: {
        type: String,
        default: "INR"
      }
    },

    // ===========================
    // Inventory
    // ===========================

    inventory: {
      stockQuantity: {
        type: Number,
        default: 0,
        min: 0
      },

      minStock: {
        type: Number,
        default: 0
      },

      maxStock: {
        type: Number,
        default: 100
      },

      reorderLevel: {
        type: Number,
        default: 10
      },

      warehouse: {
        type: String
      },

      unit: {
        type: String,
        default: "Piece"
      }
    },

    

    // ===========================
    // Variants
    // ===========================

    variants: [variantSchema],

    // ===========================
    // Specifications
    // ===========================

    specifications: [specificationSchema],

    // ===========================
    // Shipping
    // ===========================

    shipping: {
      weight: Number,

      dimensions: {
        length: Number,
        width: Number,
        height: Number
      },

      shippingClass: String,

      fragile: {
        type: Boolean,
        default: false
      }
    },

    // ===========================
    // Warranty
    // ===========================

    warranty: {
      warrantyMonths: {
        type: Number,
        default: 0
      },

      returnWindow: {
        type: Number,
        default: 0
      },

      returnable: {
        type: Boolean,
        default: true
      },

      replacement: {
        type: Boolean,
        default: true
      }
    },

    // ===========================
    // SEO
    // ===========================

    seo: {
      slug: {
        type: String,
        unique: true,
        lowercase: true
      },

      metaTitle: String,

      metaDescription: String,

      keywords: [String]
    },

    // ===========================
    // Status
    // ===========================

    status: {
      type: String,
      enum: [
        "Draft",
        "Published",
        "Archived",
        "Out Of Stock",
        "Coming Soon"
      ],
      default: "Draft"
    },

    // ===========================
    // Visibility
    // ===========================

    featured: {
      type: Boolean,
      default: false
    },

    trending: {
      type: Boolean,
      default: false
    },

    bestSeller: {
      type: Boolean,
      default: false
    },

    newArrival: {
      type: Boolean,
      default: false
    },

    // ===========================
    // Tags
    // ===========================

    tags: [
      {
        type: String
      }
    ],

    // ===========================
    // Ratings
    // ===========================

    averageRating: {
      type: Number,
      default: 0
    },

    totalReviews: {
      type: Number,
      default: 0
    },

    totalSold: {
      type: Number,
      default: 0
    },

    // ===========================
    // Admin
    // ===========================

    adminNotes: {
      type: String
    },

    isActive: {
      type: Boolean,
      default: true
    },

    isDeleted: {
      type: Boolean,
      default: false
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
    collection: "NewProduct"
  }
);

module.exports = mongoose.model("Product", productSchema);