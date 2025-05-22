import { motion, AnimatePresence } from "framer-motion";
import "../styles/App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import BookCard from "../components/books/BookCard";

function Books() {
  const [libros, setLibros] = useState([]);
  // setLoading establece loading por defecto como true, por lo que devia aparecer un mensaje de carga
  const [loading, setLoading] = useState(true);
  // se ejecuta el setSearchTearm al cambiar el valor, al utilizar el input
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // axios se utiliza para poder hacer peticiones http
        const response = await axios.get("http://localhost:3001/api/books");
        // Almaceno todos los libros en libros con la funcion setLibros, para ello hay que primero ejecutar el backend con node app.js
        setLibros(response.data);
        // se para el mensaje de carga
        setLoading(false);
      } catch (e) {
        console.log("Error al obtener los libros:", e);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p className="text-white text-center">Cargando libros...</p>;
  }

  const librosFiltrados = libros.filter((libro) =>
    // añado el searchTearm para que se actualice los resultados en cado de buscar un libro, no distincion de mayúisculas y minusculas
    libro.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-white text-3xl font-bold text-center mb-4">
        Página de Libros
      </h1>

      {/* Input para buscar los libros */}
      <input
        type="text"
        placeholder="Buscar por título..."
        className="w-1/3 p-2 mb-6 border rounded-lg block mx-auto text-indigo-600 font-bold bg-amber-50"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Contenedor de libros con animación */}
        <motion.div className="justify-center grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {librosFiltrados.length > 0 ? (
              librosFiltrados.map((libro, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <BookCard
                    // className="mx-10"
                    id={libro.id_book}
                    title={libro.title}
                    author={libro.author}
                    description={libro.description}
                    image={libro.img_src}
                    publish_date={libro.publish_date}
                    publisher={libro.publisher}
                  />
                </motion.div>
              ))
            ) : (
              <motion.p
                className="text-white col-span-full text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                No hay libros disponibles
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
    </div>
  );
}

export default Books;