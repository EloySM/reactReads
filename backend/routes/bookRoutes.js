import express from "express";
import {
  getBooksController,
  getBookByIdController,
  getLatestBooks
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/books/latest", getLatestBooks)
router.get("/books", getBooksController);
router.get("/books/:id", getBookByIdController);

export default router;
