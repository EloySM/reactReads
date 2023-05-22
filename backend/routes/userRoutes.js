import express from "express";
import * as Controller from "../controllers/userController.js";

const router = express.Router();

router.get("/exist", Controller.checkUserExists);
router.get("/login", Controller.loginUser);
router.post("/sign_up", Controller.registerUser);


export default router;
