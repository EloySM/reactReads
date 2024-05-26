import pool from "../app.js";      // ajusta si tu archivo principal se llama diferente
import * as CartQueries from "../queries/cart.js";

export const getCartByUserIdController = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("Obteniendo carrito para userId:", userId); // 🧪

    const result = await pool.query(CartQueries.getCartByUserId, [userId]);
    res.json(result.rows);
  } catch (e) {
    console.error("Error real al obtener el carrito:", e); // ⬅️ muy importante
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId, bookId } = req.body;

  if (!userId || !bookId) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  try {
    await pool.query(CartQueries.removeFromCartQuery, [userId, bookId]);
    res.status(200).json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const clearCart = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Falta el userId" });
  }

  try {
    await pool.query(CartQueries.clearCartQuery, [userId]);
    res.status(200).json({ message: "Carrito vaciado correctamente" });
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
