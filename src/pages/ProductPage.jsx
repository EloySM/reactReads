import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductPage() {
  const { id } = useParams();
  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToFavorites, setAddedToFavorites] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
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

    fetchLibro();
  }, [id]);

  const handleAddToFavorites = () => {
    setAddedToFavorites(!addedToFavorites);
  };

  const handleAddToCart = () => {
    setAddedToCart(!addedToCart);
  };

  if (loading) {
    return <p className="text-center text-gray-400 mt-10">Cargando libro...</p>;
  }

  if (!libro) {
    return <p className="text-center text-red-500 mt-10">Libro no encontrado.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
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
          <p className="text-sm text-gray-600">por <span className="text-blue-700 font-semibold">{libro.author}</span></p>

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

        {/* Caja estilo Amazon para compra */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 border border-gray-300">
          <p className="text-3xl font-semibold text-green-600">$ {libro.price || "19.99"}</p>
          <p className="text-sm text-gray-600">En stock</p>
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-md transition"
          >
            {addedToCart ? "Eliminar de la cesta" : "Añadir a la cesta"}
          </button>
          <button
            onClick={handleAddToFavorites}
            className="bg-blue-500 hover:bg-blue-400 text-white py-2 rounded-md transition"
          >
            {addedToFavorites ? "Eliminar de favoritos" : "Añadir a favoritos"}
          </button>
          <p className="text-xs text-gray-500 mt-2">Entrega gratuita mañana si haces el pedido en las próximas 3h</p>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
