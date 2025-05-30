import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();
  const { user } = useContext(UserContext); // Usamos el contexto del usuario
  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToFavorites, setAddedToFavorites] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchLibro = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/books/${id}`
        );
        setLibro(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar el libro:", error);
        setLoading(false);
      }
    };

    const checkFavorite = async () => {
      if (!user?.id || !id) {
        console.log("🚫 Usuario o ID no definido:", { user, id });
        return;
      }

      const numericBookId = Number(id);
      console.log("📦 Enviando check:", {
        userId: user.id,
        bookId: numericBookId,
        typeofBookId: typeof numericBookId,
      });

      try {
        const res = await axios.get(
          `http://localhost:3001/api/favorites/check`,
          {
            params: {
              userId: user.id,
              bookId: numericBookId,
            },
          }
        );

        console.log("✅ Respuesta de check:", res.data);
        setAddedToFavorites(res.data.isFavorite);
      } catch (err) {
        console.error("❌ Error al comprobar favorito:", err);
      }
    };

    fetchLibro();
    checkFavorite();
  }, [id, user]);

  const handleAddToFavorites = async () => {
    if (!user || !user.id) {
      alert("Debes iniciar sesión para gestionar favoritos");
      return;
    }

    try {
      if (addedToFavorites) {
        await axios.post("http://localhost:3001/api/favorites/remove", {
          userId: user.id,
          bookId: Number(id),
        });
        setAddedToFavorites(false);
      } else {
        await axios.post("http://localhost:3001/api/favorites/add", {
          userId: user.id,
          bookId: Number(id),
        });
        setAddedToFavorites(true);
      }
    } catch (err) {
      console.error("Error al modificar favoritos:", err);
      alert("Hubo un error al actualizar tus favoritos");
    }
  };

  const handleAddToCart = async () => {
    if (!user || !user.id) {
      alert("Debes iniciar sesión para añadir libros a la cesta");
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/cart/add", {
        userId: user.id,
        bookId: id,
        quantity,
      });
      setAddedToCart(true);
      alert("Libro añadido a la cesta");
    } catch (error) {
      console.error("Error al modificar la cesta:", error);
      alert("Hubo un error al actualizar la cesta");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-400 mt-10">Cargando libro...</p>;
  }

  if (!libro) {
    return (
      <p className="text-center text-red-500 mt-10">Libro no encontrado.</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
      <div className="max-w-262 mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-lg shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
        >
          <svg
            className="w-5 h-5 mr-2 -ml-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Go Back
        </button>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Imagen del libro */}
        <div className="flex justify-center items-start">
          <img
            src={libro.img_src}
            alt={libro.title}
            className="w-64 max-w-full h-auto object-contain rounded-lg"
          />
        </div>

        {/* Información del libro */}
        <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{libro.title}</h1>
          <p className="text-sm text-gray-600">
            por{" "}
            <span className="text-blue-700 font-semibold">{libro.author}</span>
          </p>

          {/* Calificación ficticia */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400 text-xl">★★★★☆</div>
            <span className="text-sm text-gray-500">(123 opiniones)</span>
          </div>

          <p className="mt-2 text-base">{libro.description}</p>

          {/* Detalles estilo Amazon */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center text-sm text-gray-700">
              <div>
                <div className="text-2xl mb-1">📄</div>
                <p className="text-gray-500">Longitud de impresión</p>
                <p className="font-bold">{libro.pages} páginas</p>
              </div>
              <div>
                <div className="text-2xl mb-1">🌐</div>
                <p className="text-gray-500">Idioma</p>
                <p className="font-bold">{libro.language}</p>
              </div>
              <div>
                <div className="text-2xl mb-1">🏢</div>
                <p className="text-gray-500">Editorial</p>
                <p className="font-bold">{libro.publisher}</p>
              </div>
              <div>
                <div className="text-2xl mb-1">📅</div>
                <p className="text-gray-500">Fecha de publicación</p>
                <p className="font-bold">{libro.publish_date}</p>
              </div>
              <div>
                <div className="text-2xl mb-1">📏</div>
                <p className="text-gray-500">Dimensiones</p>
                <p className="font-bold">{libro.dimensions}</p>
              </div>
              <div>
                <div className="text-2xl mb-1">⚖️</div>
                <p className="text-gray-500">Peso</p>
                <p className="font-bold">{libro.weight}</p>
              </div>
            </div>
            <p className="mt-4 text-blue-600 hover:underline cursor-pointer text-sm">
              Ver todos los detalles
            </p>
          </div>
        </div>

        {/* Caja de compra estilo Amazon */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 border border-gray-300">
          <p className="text-3xl font-semibold text-green-600">
            $ {libro.final_price || "19.99"}
          </p>
          <p className="text-sm text-gray-600">En stock</p>
          <p className="text-gray-600 text-sm mb-3">
            Selecciona la cantidad que deseas comprar:
          </p>

          <select
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            {[...Array(30).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddToCart}
            disabled={addedToCart}
            className={`${
              addedToCart
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-400"
            } text-black font-semibold py-2 rounded-md transition`}
          >
            {addedToCart
              ? "Ya añadido a la cesta"
              : `Añadir ${quantity} a la cesta`}
          </button>

          <button
            onClick={handleAddToFavorites}
            className={`flex items-center justify-center gap-2 py-2 px-4 rounded-md transition text-white ${
              addedToFavorites
                ? "bg-red-500 hover:bg-red-400"
                : "bg-blue-500 hover:bg-blue-400"
            }`}
          >
            {addedToFavorites ? "❤️ En favoritos" : "🤍 Añadir a favoritos"}
          </button>

          <div className="mt-4 space-y-1 text-gray-700 text-sm">
            <p>
              <strong>Vendido por:</strong> reactReads, una librería confiable y
              rápida.
            </p>
            <p>
              <strong>Distribuido por:</strong> ReactReads Distribuciones, con
              envío en 24h.
            </p>
            <p>Política de devolución: 30 días para cambios y devoluciones.</p>
            <p>Pago seguro y protegido con encriptación SSL.</p>
            <p>
              Entrega gratuita mañana si haces el pedido en las próximas 3h.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
