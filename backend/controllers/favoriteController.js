import pool from "../app.js";
import * as FavoriteQueries from "../queries/favorites.js";

// Añadir un libro a favoritos
export const addFavorite = async (req, res) => {
  const { userId, bookId } = req.body;

  if (!userId || !bookId) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  try {
    await pool.query(FavoriteQueries.addFavorite, [userId, bookId]);
    res.status(201).json({ message: "Libro añadido a favoritos" });
  } catch (err) {
    console.error("Error al añadir favorito:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminar un favorito
export const removeFavorite = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    await pool.query(FavoriteQueries.removeFavorite, [userId, bookId]);
    res.json({ message: "Libro eliminado de favoritos" });
  } catch (err) {
    console.error("Error al eliminar favorito:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener favoritos por usuario
export const getFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(FavoriteQueries.getFavoritesByUserId, [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener favoritos:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Verificar si un libro es favorito
export const checkIsFavorite = async (req, res) => {
  const { userId, bookId } = req.query;

  if (!userId || !bookId) {
    return res.status(400).json({ message: "Faltan datos obligatorios" }); // si faltan datos, avisar al cliente
  }

  try {
    const result = await pool.query(FavoriteQueries.isFavorite, [userId, bookId]);
    res.json({ isFavorite: result.rowCount > 0 });
  } catch (err) {
    console.error("Error al verificar favorito:", err); // imprimir el error en consola para entender qué pasa
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
