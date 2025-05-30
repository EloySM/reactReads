import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../context/UserContext";


function OrdersPage() {
  const { user, loading: userLoading } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(user)
    // Mientras se carga el usuario, mantenemos estado de carga
    if (userLoading) return;

    // Si no hay usuario autenticado
    if (!user) {
      setError("Debes iniciar sesión para ver tus órdenes");
      setPageLoading(false);
      return;
    }

    // Obtenemos el ID del usuario
    const userId = user.id;

    if (!userId) {
      setError("Usuario no tiene ID válido");
      setPageLoading(false);
      return;
    }

    // Iniciar petición a la API
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/orders/${userId}`);
        if (!res.ok) throw new Error("Error al obtener las órdenes");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setPageLoading(false);
      }
    };

    fetchOrders();
  }, [user, userLoading]);

  if (userLoading || pageLoading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!orders.length) return <p>No tienes compras realizadas.</p>;
  console.log(orders)

  return (
    <div className="max-w-5xl mx-auto p-6 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6">Compras realizadas</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">Fecha</th>
            <th className="p-2">Libros</th>
            <th className="p-2">Cantidad</th>
            <th className="p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(({ id, date, items, total }) => (
            <tr key={id} className="border-b">
              <td className="p-2">{new Date(date).toLocaleDateString()}</td>
              <td className="p-2">{items.map(({ title }) => title).join(", ")}</td>
              <td className="p-2">{items.reduce((acc, item) => acc + item.quantity, 0)}</td>
              <td className="p-2 font-semibold">${Number(total).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

OrdersPage.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default OrdersPage;
