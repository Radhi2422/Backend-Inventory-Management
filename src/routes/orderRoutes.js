const express = require("express");

const router = express.Router();

const {
    getOrders
} = require("../controllers/orderController.js");

/**
 * @swagger
 * /orders/get:
 *   get:
 *     summary: Get all orders
 *     description: Returns a list of all orders from the database.
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get("/get", getOrders);

module.exports = router;