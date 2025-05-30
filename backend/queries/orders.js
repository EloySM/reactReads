export const insertOrderQuery = `
  INSERT INTO "users"."orders" (user_id, total)
  VALUES ($1, $2)
  RETURNING id;
`;


export const insertOrderItemQuery = `
  INSERT INTO users.order_items (order_id, book_id, quantity, price)
  VALUES ($1, $2, $3, $4);
`;

export const getOrdersWithItemsByUserId = `
  SELECT 
    o.id,
    o.created_at AS date,
    o.total,
    json_agg(
      json_build_object(
        'book_id', b.id,
        'title', b.title,
        'quantity', oi.quantity,
        'price', oi.price
      )
    ) AS items
  FROM users.orders AS o
  JOIN users.order_items AS oi ON o.id = oi.order_id
  LEFT JOIN public.books AS b ON oi.book_id = b.id
  WHERE o.user_id = $1
  GROUP BY o.id, o.created_at, o.total
  ORDER BY o.created_at DESC;
`;


export const getDiscountedPrice = `
  SELECT 
    COALESCE(
      b.price_base * (1 - d.discount_percent / 100),
      b.price_base
    ) AS final_price
  FROM 
    public.books b
  LEFT JOIN 
    public.books_discounts d
    ON b.id = d.book_id
    AND CURRENT_DATE BETWEEN d.start_date AND COALESCE(d.end_date, CURRENT_DATE + INTERVAL '100 years')
  WHERE 
    b.id = $1;
`;

