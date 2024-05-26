import pool from "../app.js";
import bcrypt from "bcrypt";
import * as UserQueries from "../queries/users.js";

export const checkUserExists = async (req, res) => {
  const { username, email } = req.query;
  if (!username || !email) {
    return res.status(400).json({ message: "Falta username o email" });
  }

  try {
    const result = await pool.query(UserQueries.getUser, [username, email]);
    return res.json({ exists: result.rows.length > 0 });
  } catch (e) {
    console.error("Error al verificar usuario: ", e);
    res.status(500).json({ message: "Error al verificar usuario" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const result = await pool.query(UserQueries.loginUser, [username]);
    if (result.rows.length === 0)
      return res.status(401).json({ message: "Usuario no encontrado" });
    const user = result.rows[0];
    // Comparar la contraseña enviada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    return res.status(200).json({
      message: "Login exitoso",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    console.error("Error al logear usuario: ", e);
    res.status(500).json({ message: "Error al logear usuario" });
  }
};

export const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(UserQueries.createUser, [
      name,
      username,
      email,
      hashedPassword,
      true,
    ]);

    if (result.rows.length === 0) {
      return res.status(500).json({ message: "No se ha creado el usuario" });
    }

    res.status(201).json({ success: true });
  } catch (e) {
    console.error("Error al crear usuario: ", e);
    res.status(500).json({ message: "Error al insertar usuario" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, username, email } = req.body;

  if (!name || !username || !email) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const result = await pool.query(UserQueries.updateUser, [name, username, email, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json({ message: "Usuario actualizado", user: result.rows[0] });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const addToCart = async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  if (!userId || !bookId || !quantity) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  try {
    await pool.query(UserQueries.addToCart,
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
    const result = await pool.query(UserQueries.increaseQuantity, [userId, bookId]);

    if (result.rowCount === 0) {
      // Si no existe, insertar con cantidad 1
      const insertResult = await pool.query(UserQueries.insertProductToCart, [userId, bookId, 1]);
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
    const current = await pool.query(UserQueries.getQuantity, [userId, bookId]);

    if (current.rowCount === 0) {
      return res.status(404).json({ error: "Producto no encontrado en carrito" });
    }

    const quantity = current.rows[0].quantity;

    if (quantity <= 1) {
      await pool.query(UserQueries.deleteProductFromCart, [userId, bookId]);
      return res.json({ message: "Producto eliminado del carrito" });
    } else {
      const result = await pool.query(UserQueries.decreaseQuantity, [userId, bookId]);
      return res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al disminuir cantidad" });
  }
};