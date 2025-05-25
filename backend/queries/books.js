export const getBooks = `
SELECT * 
FROM books;
`;

// Sacar los id para buscar el libro y mostrarlo en el ProductPage, en donde se muestra el libro con todos sus datos para la compra
/*
b.* → Selecciona todos los datos del libro de la tabla books (como title, author, price, etc.).

d.discount_percent → Trae el porcentaje de descuento si existe.

ROUND(...) → Calcula el precio con descuento, redondeado a 2 decimales.

COALESCE(..., b.price) → Si no hay descuento válido, usa el b.price normal.

AS final_price → Le da el nombre final_price al resultado (precio final que verás).

FROM books b
Esto dice:
👉 "Quiero traer libros desde la tabla books, y voy a llamar a esa tabla b para escribir menos".

LEFT JOIN discounts_books d ON ...
Esto une la tabla books con la tabla discounts_books, pero de una forma suave:

LEFT JOIN → Dice: "Tráeme los libros aunque no tengan descuento".

b.id = d.book_id → Une un libro con su descuento si existe.

AND NOW() >= d.start_date → El descuento ya empezó.

AND (d.end_date IS NULL OR NOW() <= d.end_date) → El descuento no ha terminado, o no tiene fecha de final. 
*/
export const getBookById = `
SELECT 
  b.*, 
  d.discount_percent,
  COALESCE(
    ROUND(b.price_base * (1 - d.discount_percent / 100.0), 2),
    b.price_base
  ) AS final_price
FROM books b
LEFT JOIN books_discounts d 
  ON b.id = d.book_id 
  AND NOW() >= d.start_date 
  AND (d.end_date IS NULL OR NOW() <= d.end_date)
WHERE b.id = $1
LIMIT 1;
`;
