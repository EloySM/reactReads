import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Trash2, Plus, Minus } from "lucide-react";

function CartPage({ userId }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animateItem, setAnimateItem] = useState({}); // { [id]: 'increase'|'decrease'|null }

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    fetch(`http://localhost:3001/api/cart/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener el carrito");
        return res.json();
      })
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  const animateQuantity = (id, type) => {
    setAnimateItem((prev) => ({ ...prev, [id]: type }));
    setTimeout(() => {
      setAnimateItem((prev) => ({ ...prev, [id]: null }));
    }, 1200);
  };

  const handleRemoveItem = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/cart/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, bookId }),
      });

      if (!response.ok) throw new Error("Error al eliminar el libro");

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== bookId)
      );
    } catch (err) {
      alert("Error al eliminar el libro del carrito");
      console.error(err);
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/cart/clear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) throw new Error("Error al vaciar el carrito");
      setCartItems([]); // vaciar estado local
      alert("Carrito vaciado");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleIncreaseQuantity = async (id) => {
    try {
      const response = await fetch("http://localhost:3001/api/user/cart/increase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, bookId: id }),
      });
      if (!response.ok) throw new Error("Error al aumentar cantidad");
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      animateQuantity(id, "increase");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDecreaseQuantity = async (id, quantity) => {
    try {
      if (quantity <= 1) {
        // eliminar el item si cantidad es 1
        const response = await fetch("http://localhost:3001/api/user/cart/remove", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, bookId: id }),
        });
        if (!response.ok) throw new Error("Error al eliminar el libro");
        setCartItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        // disminuir cantidad
        const response = await fetch("http://localhost:3001/api/user/cart/decrease", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, bookId: id }),
        });
        if (!response.ok) throw new Error("Error al disminuir cantidad");
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      }
      animateQuantity(id, "decrease");
    } catch (error) {
      alert(error.message);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  if (loading)
    return <p className="text-center text-white mt-10">Cargando carrito...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (cartItems.length === 0)
    return (
      <p className="text-center text-gray-400 mt-10 text-lg">
        Tu carrito está vacío.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md text-gray-800">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2 text-blue-900">
        🛒 Tu carrito
      </h1>

      <div className="grid grid-cols-1 gap-6">
        {cartItems.map(({ id, title, author, price, quantity, img_src }) => (
          <div
            key={id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm flex gap-4 items-center bg-gray-50 hover:shadow-md transition"
          >
            {/* Imagen del libro */}
            <div className="w-24 h-32 flex-shrink-0">
              <img
                src={img_src}
                alt={`Portada de ${title}`}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Información del libro */}
            <div className="flex flex-col justify-between flex-grow">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-600 mb-1">por {author}</p>
              <p className="text-sm text-gray-700">
                Precio:{" "}
                <span className="font-medium">${Number(price).toFixed(2)}</span>
              </p>

              {/* Cantidad con animación */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => handleDecreaseQuantity(id, quantity)}
                  className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm text-gray-700 hover:bg-red-500 hover:text-white transition duration-200 select-none"
                  title="Disminuir cantidad"
                >
                  <Minus size={16} strokeWidth={2} />
                </button>

                <span
                  className={`font-semibold text-sm w-6 text-center leading-none transition-transform duration-300 
                    ${animateItem[id] === "increase" ? "text-green-600 scale-150" : ""}
                    ${animateItem[id] === "decrease" ? "text-red-600 scale-150" : ""}
                  `}
                >
                  {quantity}
                </span>

                <button
                  onClick={() => handleIncreaseQuantity(id)}
                  className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm text-gray-700 hover:bg-green-500 hover:text-white transition duration-200 select-none"
                  title="Aumentar cantidad"
                >
                  <Plus size={16} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Subtotal y botón de eliminar */}
            <div className="flex flex-col items-end justify-between h-full ml-4">
              <p className="text-base font-semibold text-green-700">
                ${(Number(price) * quantity).toFixed(2)}
              </p>
              <button
                onClick={() => handleRemoveItem(id)}
                className="text-red-500 hover:text-red-600 mt-2 p-1"
                title="Eliminar del carrito"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-xl font-bold text-gray-900">
          Total: ${total.toFixed(2)}
        </div>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <button
            onClick={handleClearCart}
            className="bg-red-100 text-red-600 px-4 py-2 rounded-md hover:bg-red-200 transition text-sm font-medium"
          >
            Vaciar carrito
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition text-sm font-medium">
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}

CartPage.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CartPage;
