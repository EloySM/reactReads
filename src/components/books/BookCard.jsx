import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function BookCard({ id, title, author, image }) {
  const [hover, setHover] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
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

  // Velocidad constante en píxeles por segundo
  const speed = 50;
  // Dar una velocidad igual a cada titulo sin importar el ancho
  const duration = (textWidth - containerWidth) / speed;

  // const handleBookClick = () => {
  //   // Codificar el titulo del libro para la URL
  //   const encodedTitle = decodeURIComponent(title)
  //   navigate(`/book/${encodedTitle}`)
  // }

  return (
    <>
      {/* Permite cambiar de página dinámicamente sin un <a href="..." />.
          No recarga la página, lo que hace la navegación más rápida.
          Funciona bien en aplicaciones Single Page Application (SPA) creadas con React Router.
       */}
       
      <div
        onClick={() => {
          console.log("Navigating to:", id)
          navigate(`/book/${id}`)}
        }
        className="bg-gray-800 text-white w-auto hover:bg-indigo-600 rounded-xl transition flex flex-col item-center"
      >
          <img
            className="w-80 h-134 mx-auto mt-5 rounded-sm inline-block saturate-150 cursor-pointer hover:translate-1.5 transition"
            src={image}
            alt={title}
          />
        <p className="mt-4 mr-6 text-indigo-400 font-bold text-end">{author}</p>

        {/* Contenedor del título */}
        <div
          ref={containerRef}
          className="w-72 h-12 mx-auto text-center overflow-hidden relative"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <p
            ref={titleRef}
            className={`text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200 pb-1 text-2xl font-bold whitespace-nowrap transition-transform ease-linear ${
              hover && shouldAnimate ? "animate-scroll" : "truncate"
            }`}
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

        <button className="bg-linear-to-r/oklch from-lime-300 from-0% via-green-400 via-45% to-lime-300 to-100% text-2xl mt-7 mx-10 my-4 py-2 rounded-xl font-extrabold hover:scale-105 cursor-pointer transition duration-300 ease-out">
          Add
        </button>
      </div>
    </>
  );
}

BookCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default BookCard;
