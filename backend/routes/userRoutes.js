import express from "express";
import * as Controller from "../controllers/userController.js";

const router = express.Router();

router.get("/exist", Controller.checkUserExists);
router.post("/login", Controller.loginUser);
router.post("/sign_up", Controller.registerUser);
router.put("/update/:id", Controller.updateUser);
router.post("/cart/add", Controller.addToCart);
router.post("/cart/remove", Controller.updateUser);

// Usamos import para estas funciones también
router.post("/cart/increase", Controller.increaseCartQuantity);
router.post("/cart/decrease", Controller.decreaseCartQuantity);

export default router;
