const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");
// const route=require("../routes/")
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Order API",
      version: "1.0.0",
      description: "API documentation for Order Management"
    },
    servers: [
      {
        url: "http://localhost:5001"
      }
    ]
  },
  apis: [path.join(__dirname, "../routes/*.js")]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;