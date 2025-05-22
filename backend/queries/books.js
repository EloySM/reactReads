export const getBooks = "SELECT * FROM books";

// Sacar los id para buscar el libro y mostrarlo en el ProductPage, en donde se muestra el libro con todos sus datos para la compra
export const getBookById = "SELECT * FROM books WHERE id_book = $1 LIMIT 1";
