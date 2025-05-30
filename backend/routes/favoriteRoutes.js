import express from "express";
import {
  checkFavorite,
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favoriteController.js";

const router = express.Router();

// ✔️ Ruta para comprobar si un libro está en favoritos
router.get("/check", checkFavorite);

// ✔️ Ruta para obtener todos los favoritos de un usuario
router.get("/:userId", getFavorites);

// ✔️ Añadir a favoritos
router.post("/add", addFavorite);

// ✔️ Eliminar de favoritos
router.post("/remove", removeFavorite);

export default router;
