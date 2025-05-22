import pkg from "pg";
const { Pool } = pkg;

const config = {
  user: "postgres",
  host: "localhost",
  password: "abc123..",
  database: "reactReads",
  port: "5432",
};

const pool = new Pool(config);

export default pool;