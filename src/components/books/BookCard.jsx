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
          navigate(`/book/${id}`)
        }
        }
        className="bg-neutral-900 text-white w-auto hover:bg-indigo-700 rounded-xl transition flex flex-col shadow-[0_0_15px_4px_rgba(255,255,255,0.1)] ring-1 ring-gray-900/10"
      >
        <img
          className="w-72 h-110 mx-auto mt-10 rounded-sm inline-block saturate-150 cursor-pointer hover:translate-1.5 transition"
          src={image}
          alt={title}
        />
        {/* <p className="mt-4 mr-6 text-indigo-400 font-bold text-end">{author}</p> */}
        <p className="mr-11 mt-2 text-indigo-400 font-bold text-end text-sm">{author}</p>

        {/* Contenedor del título */}
        <div
          ref={containerRef}
          className="w-72 h-12 mx-auto mt-0 text-center overflow-hidden relative"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <p
            ref={titleRef}
            className={`text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200 pb-1 text-2xl font-bold whitespace-nowrap transition-transform ease-linear ${hover && shouldAnimate ? "animate-scroll" : "truncate"
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

        {/* <p className="mr-11 mb-3 text-indigo-400 font-bold text-end text-sm">{author}</p> */}


        {/* Botón sin span, con fondo degradado */}
        <div className="flex flex-col items-center space-y-3 mb-5">
          {/* Botón 1: Añadir a la cesta (verde degradado) */}
          <button
            type="button"
            className="w-52 text-center px-5 py-2.5 text-sm font-medium text-white rounded-lg border-2 border-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-origin-border hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Add to cart
          </button>

          {/* Botón 2: Añadir a favoritos (borde degradado) */}
          <button
            type="button"
            className="w-52 text-center relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="w-full text-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Add to favorites
            </span>
          </button>
        </div>



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
