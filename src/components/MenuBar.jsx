import { Link, useLocation } from "react-router-dom";
import "../styles/App.css";
import { motion } from "framer-motion"

function MenuBar() {

  const location = useLocation() //Detectamos la ruta actual

  function getLinkClass(path) {
    return location.pathname === path 
    ? "m-2 p-2 transition duration-300 text-emerald-300 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500" : "m-2 p-2 transition duration-300 text-transparent"
  }

  return (
    <div className="">
      <nav className="text-2xl font-bold w-fit mx-auto pt-5">
        {/* Aplica el gradiente solo al fondo de la lista */}
        <ul className="p-1 flex bg-indigo-600 rounded-4xl">
          <li className={getLinkClass("/")}>
            <Link
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300"
              to="/"
            >
              News
            </Link>
          </li>
          <li className={getLinkClass("/books")}>
            <Link
              className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
              to="/books"
            >
              Books
            </Link>
          </li>
          <li className={getLinkClass("/comicsMangas")}>
            <Link
              className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
              to="/comicsMangas"
            >
              Comic & Mangas
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MenuBar;
