import pool from "../app.js";
import * as OrdersQueries from "../queries/orders.js";

export const getDiscountedPrice = async (bookId) => {
  const result = await pool.query(OrdersQueries.getDiscountedPrice, [bookId]);
  return result.rows[0]?.final_price || null;
};

export const createOrder = async (req, res) => {
  const { userId, items } = req.body;

  console.log("📦 Payload recibido:", { userId, items });

  if (!userId || !Array.isArray(items) || items.length === 0) {
    console.warn("⚠️ Datos inválidos recibidos:", req.body);
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    console.log("🔄 BEGIN transacción");

    let total = 0;
    const enrichedItems = [];

    for (const item of items) {
      const { bookId, quantity } = item;
      const price = await getDiscountedPrice(bookId);

      console.log(`📘 Item: bookId=${bookId}, quantity=${quantity}, price=${price}`);

      if (!price || !quantity) {
        console.warn("❌ Item con precio o cantidad inválidos:", item);
        throw new Error("Precio o cantidad inválidos");
      }

      total += Number(price) * Number(quantity);
      enrichedItems.push({ bookId, quantity, price });
    }

    console.log("💰 Total calculado:", total);
    console.log("📦 Items enriquecidos:", enrichedItems);

    const orderResult = await client.query(OrdersQueries.insertOrderQuery, [userId, total]);
    const orderId = orderResult.rows[0].id;

    console.log("🆔 Orden insertada con ID:", orderId);

    for (const item of enrichedItems) {
      console.log("➕ Insertando item de orden:", item);
      await client.query(OrdersQueries.insertOrderItemQuery, [
        orderId,
        item.bookId,
        item.quantity,
        item.price,
      ]);
    }

    await client.query("COMMIT");
    console.log("✅ COMMIT hecho, orden completa");
    res.status(201).json({ message: "Orden creada exitosamente", orderId });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Error al crear la orden:", error);
    res.status(500).json({ message: "Error interno al crear la orden" });
  } finally {
    client.release();
    console.log("🔓 Cliente liberado");
  }
};


export const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "Falta el userId" });
  }

  try {
    // Opcional: convertir userId a número, si tu DB espera integer
    const userIdNum = Number(userId);
    if (isNaN(userIdNum)) {
      return res.status(400).json({ message: "userId inválido" });
    }

    const result = await pool.query(OrdersQueries.getOrdersWithItemsByUserId, [userIdNum]);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener órdenes:", error);
    res.status(500).json({ message: "Error al obtener las órdenes" });
  }
};


