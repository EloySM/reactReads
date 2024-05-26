import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import CartPage from "../components/cart/CartPage"; // Ajusta ruta si necesario

export default function Cart() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <p className="text-center text-white">Por favor inicia sesión para ver tu carrito.</p>;
  }

  return <CartPage userId={user.id} />;
}
