// Libros que sean favoritos
export const addFavorite = `
  INSERT INTO users.favorites (user_id, book_id)
  VALUES ($1, $2)
  ON CONFLICT (user_id, book_id) DO NOTHING;
`;

export const removeFavorite = `
  DELETE FROM users.favorites
  WHERE user_id = $1 AND book_id = $2;
`;

export const getFavoritesByUserId = `
  SELECT b.*
  FROM users.favorites f
  JOIN books b ON f.book_id = b.id
  WHERE f.user_id = $1;
`;

export const isFavorite = `
  SELECT 1
  FROM users.favorites
  WHERE user_id = $1 AND book_id = $2
  LIMIT 1;
`;
