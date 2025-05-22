import express from "express";
import { checkUserExists, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/exist", checkUserExists);
router.post("/sign_up", registerUser);

export default router;
