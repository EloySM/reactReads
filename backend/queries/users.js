// Para saber si ya esta dado de alta el usuario
// En vez de estar trayend todos los valores de las columnas lo que hace es devolver 1 si se encuentra lo siguiente en la base de datos
export const checkUserExists = `
SELECT 1 
FROM users.users 
WHERE username = $1 AND email = $2 AND deleted IS NULL 
LIMIT 1;`;

export const loginUser = `
SELECT *
FROM users.users
WHERE username = $1 AND deleted IS NULL
LIMIT 1;`;

export const createUser = `
INSERT INTO users.users (name, username, email, password, active)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;`;

export const updateUser = `
UPDATE users.users 
SET name = $1, username = $2, email = $3 
WHERE id = $4 
RETURNING *;`;

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
