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


export const addToCart = `
  INSERT INTO users.cart (user_id, book_id, quantity)
  VALUES ($1, $2, $3)
  ON CONFLICT (user_id, book_id)
  DO UPDATE SET quantity = users.cart.quantity + EXCLUDED.quantity;
`;

export const increaseQuantity = `
  UPDATE users.cart
  SET quantity = quantity + 1
  WHERE user_id = $1 AND book_id = $2
  RETURNING *;
`;

export const insertProductToCart = `
  INSERT INTO users.cart (user_id, book_id, quantity)
  VALUES ($1, $2, $3);
`;

export const getQuantity = `
  SELECT quantity
  FROM users.cart
  WHERE user_id = $1 AND book_id = $2;
`;

export const decreaseQuantity = `
  UPDATE users.cart
  SET quantity = quantity - 1
  WHERE user_id = $1 AND book_id = $2 AND quantity > 1
  RETURNING *;

`;

export const deleteProductFromCart = `
  DELETE FROM users.cart
  WHERE user_id = $1 AND book_id = $2;
`;
