import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FavoritesPage() {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Cargar favoritos al montar el componente
  useEffect(() => {
    if (!user || !user.id) return;

    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3001/api/favorites/${user.id}`
        );
        setFavorites(res.data);
        setLoading(false);
      } catch (e) {
        setError("Error cargando favoritos", e);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  // Eliminar un libro de favoritos
  const handleRemoveFavorite = async (bookId) => {
    try {
      await axios.post("http://localhost:3001/api/favorites/remove", {
        userId: user.id,
        bookId,
      });
      // Actualizar estado quitando el libro eliminado
      setFavorites((prev) => prev.filter((book) => book.id !== bookId));
    } catch (e) {
      alert("Error eliminando favorito", e);
    }
  };

  if (!user) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Debes iniciar sesión para ver tus favoritos.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">Cargando favoritos...</div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">{error}</div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">
        No tienes libros favoritos aún.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto mb-8">
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

      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Tus Libros Favoritos
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {favorites.map((libro) => (
          <div
            key={libro.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={libro.img_src}
              alt={libro.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {libro.title}
              </h2>
              <p className="text-sm text-gray-600 mb-3">por {libro.author}</p>
              <button
                onClick={() => handleRemoveFavorite(libro.id)}
                className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
              >
                Eliminar de favoritos
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
