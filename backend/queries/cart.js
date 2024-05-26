export const getCartByUserId = `
  SELECT 
    c.book_id AS id,
    b.title,
    b.author,
    b.price_base AS price,
    b.img_src,
    c.quantity
  FROM users.cart c
  JOIN books b ON c.book_id = b.id
  WHERE c.user_id = $1;
`;

// Eliminar un producto
export const removeFromCartQuery = `
  DELETE FROM users.cart
  WHERE user_id = $1 AND book_id = $2;
`;

// Eliminar todos lo productos
export const clearCartQuery = `
  DELETE FROM users.cart
  WHERE user_id = $1;
`;

