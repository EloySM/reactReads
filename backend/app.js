import express from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import cors from "cors";

import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default pool;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", bookRoutes);     // /api/books, /api/books/:id
app.use("/api/user", userRoutes); // /api/user/exist, /sign_up

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
