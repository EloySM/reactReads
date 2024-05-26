import express from "express";
import * as Controller from "../controllers/cartController.js";

const router = express.Router();

router.post("/cart/remove", Controller.removeFromCart);
router.post("/cart/clear", Controller.clearCart);
router.get("/cart/:userId", Controller.getCartByUserIdController);

export default router;
