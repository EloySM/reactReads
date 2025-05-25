import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function CartPage({ userId }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "El Quijote",
      author: "Miguel de Cervantes",
      price: 15.99,
      quantity: 2,
    },
    {
      id: 2,
      title: "Cien Años de Soledad",
      author: "Gabriel García Márquez",
      price: 12.5,
      quantity: 1,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 useEffect(() => {
  if (!userId) return; // si no hay userId, no haces nada

  setLoading(true);
  setError(null);

  fetch(`http://localhost:3001/api/cart/${userId}`)
    .then((res) => {
      if (!res.ok) throw new Error("Error al obtener el carrito");
      return res.json();
    })
    .then((data) => {
      setCartItems(data); // aquí asumes que el backend te devuelve un array con los productos del carrito
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, [userId]);


  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (cartItems.length === 0)
    return <p className="text-center text-gray-500">Tu carrito está vacío.</p>;

  return (
    <div className="text-black font-bold max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
        Tu carrito
      </h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-600 border-b border-gray-200">
            <th className="py-3 px-4 font-normal">Libro</th>
            <th className="py-3 px-4 font-normal">Autor</th>
            <th className="py-3 px-4 font-normal">Precio</th>
            <th className="py-3 px-4 font-normal text-center">Cantidad</th>
            <th className="py-3 px-4 font-normal text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(({ id, title, author, price, quantity }) => (
            <tr
              key={id}
              className="border-b border-gray-100 hover:bg-gray-50 transition"
            >
              <td className="py-3 px-4">{title}</td>
              <td className="py-3 px-4 text-gray-600">{author}</td>
              <td className="py-3 px-4">${price.toFixed(2)}</td>
              <td className="py-3 px-4 text-center">{quantity}</td>
              <td className="py-3 px-4 text-right font-semibold">
                ${(price * quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 text-right text-lg font-semibold text-gray-900">
        Total: $
        {cartItems
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)}
      </div>
    </div>
  );
}

// Añadimos la validación de PropTypes
CartPage.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CartPage;
