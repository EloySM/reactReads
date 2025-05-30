import PropTypes from "prop-types";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

function BookCard({ id, title, author, image }) {
  const [hover, setHover] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [adding, setAdding] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity] = useState(1); // Puedes hacer esto dinámico más adelante
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (titleRef.current && containerRef.current) {
      const textW = titleRef.current.scrollWidth;
      const containerW = containerRef.current.clientWidth;
      setTextWidth(textW);
      setContainerWidth(containerW);
      setShouldAnimate(textW > containerW);
    }
  }, [title]);

  const speed = 50;
  const duration = (textWidth - containerWidth) / speed;

  const handleAddToFavorites = async () => {
    if (!user || !user.id) {
      alert("Debes iniciar sesión para agregar a favoritos.");
      return;
    }

    try {
      setAdding(true);
      await axios.post("http://localhost:3001/api/favorites/add", {
        userId: user.id,
        bookId: id,
      });
      alert("Libro añadido a favoritos ✅");
    } catch (e) {
      console.error("Error al añadir a favoritos", e);
      alert("No se pudo añadir a favoritos ❌");
    } finally {
      setAdding(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user || !user.id) {
      alert("Debes iniciar sesión para añadir libros a la cesta");
      return;
    }

    try {
      setAdding(true);
      await axios.post("http://localhost:3001/api/cart/add", {
        userId: user.id,
        bookId: id,
        quantity,
      });
      setAddedToCart(true);
      alert("Libro añadido a la cesta 🛒");
    } catch (error) {
      console.error("Error al modificar la cesta:", error);
      alert("Hubo un error al actualizar la cesta ❌");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div
      onClick={() => navigate(`/book/${id}`)}
      className="bg-neutral-900 text-white w-auto hover:bg-indigo-700 rounded-xl transition flex flex-col shadow-[0_0_15px_4px_rgba(255,255,255,0.1)] ring-1 ring-gray-900/10"
    >
      <img
        className="w-72 h-110 mx-auto mt-10 rounded-sm inline-block saturate-150 cursor-pointer hover:translate-1.5 transition"
        src={image}
        alt={title}
      />

      <p className="mr-11 mt-2 text-indigo-400 font-bold text-end text-sm">{author}</p>

      <div
        ref={containerRef}
        className="w-72 h-12 mx-auto mt-0 text-center overflow-hidden relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <p
          ref={titleRef}
          className={`text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200 pb-1 text-2xl font-bold whitespace-nowrap transition-transform ease-linear ${hover && shouldAnimate ? "animate-scroll" : "truncate"}`}
          style={{
            transform:
              hover && shouldAnimate
                ? `translateX(-${textWidth - containerWidth}px)`
                : "translateX(0)",
            transition:
              hover && shouldAnimate
                ? `transform ${duration}s linear`
                : "none",
            minWidth: "max-content",
          }}
        >
          {title}
        </p>
      </div>

      <div className="flex flex-col items-center space-y-3 mb-5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={adding}
          className={`w-52 text-center px-5 py-2.5 text-sm font-medium text-white rounded-lg border-2 border-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-origin-border focus:outline-none focus:ring-2 focus:ring-green-400 ${
            adding ? "opacity-50 cursor-not-allowed" : "hover:from-green-600 hover:to-emerald-600"
          }`}
        >
          {addedToCart ? "Añadido ✅" : "Add to cart"}
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToFavorites();
          }}
          disabled={adding}
          className={`w-52 text-center relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 text-white focus:ring-4 focus:outline-none ${
            adding ? "opacity-50 cursor-not-allowed" : "hover:from-purple-700 hover:to-blue-600"
          }`}
        >
          <span className="w-full text-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            {adding ? "Añadiendo..." : "Add to favorites"}
          </span>
        </button>
      </div>
    </div>
  );
}

BookCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default BookCard;
