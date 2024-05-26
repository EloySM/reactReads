import express from "express";
import * as FavoriteController from "../controllers/favoriteController.js";

const router = express.Router();

router.post("/favorites/add", FavoriteController.addFavorite);
router.post("/favorites/remove", FavoriteController.removeFavorite);
router.get("/favorites/:userId", FavoriteController.getFavorites);
router.get("/favorites/check", FavoriteController.checkIsFavorite);

export default router;
