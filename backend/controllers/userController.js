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
  if ( !username || !password ) {
    return res.status(400).json({ message: "Faltan campos obligatorios"});
  }

  try {
    const result = await pool.query(UserQueries.loginUser, [username]);
    if (result.rows.length === 0) return res.status(401).json({ message: "Usuario no encontrado" })
    const  user = result.rows[0]
  // Comparar la contraseña enviada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) res.status(401).json({ message: "Contraseña incorrecta"})

    return res.status(200).json({
      message: "Login exitoso",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email
      }
    })
  } catch (e) {
    console.error("Error al logear usuario: ", e);
    res.status(500).json({ message: "Error al logear usuario"});
  }
}

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
