import { useEffect, useState } from "react";
import axios from "axios";

function BookCardNews() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3001/api/books/latest");
        setBooks(res.data);
        setError(null);
      } catch (err) {
        console.error("Error al obtener los libros más recientes:", err);
        setError("No se pudieron cargar los libros. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-600">
        Cargando libros...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center text-gray-600">
        No hay libros recientes para mostrar.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 mx-90">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-gradient-to-br from-indigo-600 to-indigo-400 rounded-3xl shadow-lg overflow-hidden flex flex-col"
        >
          <img
            src={book.img_src}
            alt={book.title}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <div className="p-5 flex flex-col flex-grow">
            <h2 className="text-white text-xl font-bold mb-2 truncate" title={book.title}>
              {book.title}
            </h2>
            <p className="text-indigo-100 flex-grow text-sm overflow-hidden line-clamp-3">
              {book.description}
            </p>
            <button
              className="mt-4 bg-white text-indigo-700 font-semibold rounded-full py-2 px-4 hover:bg-indigo-50 transition"
              aria-label={`Ver más sobre ${book.title}`}
              onClick={() => alert(`Clicked en: ${book.title}`)}
            >
              Ver más
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookCardNews;
