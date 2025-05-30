import pool from "../app.js";
import * as BookQueries from "../queries/books.js";

export const getBooksController = async (req, res) => {
  try {
    const result = await pool.query(BookQueries.getBooks);
    res.json(result.rows);
  } catch (e) {
    console.error("Error al obtener los libros:", e);
    res.status(500).json({ error: "Error al obtener los libros" });
  }
};

export const getBookByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(BookQueries.getBookById, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (e) {
    console.error("Error al obtener el libro:", e);
    res.status(500).json({ error: "Error al obtener el libro" });
  }
};

export const getLatestBooks = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM books
      ORDER BY publish_date DESC
      LIMIT 4
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error al obtener los libros más recientes:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
