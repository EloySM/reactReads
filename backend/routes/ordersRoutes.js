import express from "express";
import * as Controller from "../controllers/ordersController.js";

const router = express.Router();

router.post("/orders/create", Controller.createOrder);
router.get("/orders/:userId", Controller.getOrdersByUserId);

export default router;
