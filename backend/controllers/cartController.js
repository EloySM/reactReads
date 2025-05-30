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

export const addToCart = async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  if (!userId || !bookId || !quantity) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  try {
    await pool.query(CartQueries.addToCart,
      [userId, bookId, quantity]
    );
    res.status(201).json({ message: "Libro añadido al carrito" });
  } catch (error) {
    console.error("Error al añadir al carrito:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Para aumentar o reducir el numero de productos en cart
export const increaseCartQuantity = async (req, res) => {
  const { userId, bookId } = req.body;
  if (!userId || !bookId) return res.status(400).json({ error: "Faltan datos" });

  try {
    const result = await pool.query(CartQueries.increaseQuantity, [userId, bookId]);

    if (result.rowCount === 0) {
      // Si no existe, insertar con cantidad 1
      const insertResult = await pool.query(CartQueries.insertProductToCart, [userId, bookId, 1]);
      return res.json(insertResult.rows[0]);
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al aumentar cantidad" });
  }
};

export const decreaseCartQuantity = async (req, res) => {
  const { userId, bookId } = req.body;
  if (!userId || !bookId) return res.status(400).json({ error: "Faltan datos" });

  try {
    const current = await pool.query(CartQueries.getQuantity, [userId, bookId]);

    if (current.rowCount === 0) {
      return res.status(404).json({ error: "Producto no encontrado en carrito" });
    }

    const quantity = current.rows[0].quantity;

    if (quantity <= 1) {
      await pool.query(CartQueries.deleteProductFromCart, [userId, bookId]);
      return res.json({ message: "Producto eliminado del carrito" });
    } else {
      const result = await pool.query(CartQueries.decreaseQuantity, [userId, bookId]);
      return res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al disminuir cantidad" });
  }
};