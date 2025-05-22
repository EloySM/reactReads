import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/App.css";
import { IconContext } from "react-icons";
import { FaCartShopping, FaCircleUser } from "react-icons/fa6";
import logo from "../assets/img/profile.png";

function MenuBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { path: "/", label: "News", gradient: "from-orange-600 to-yellow-300", activeGradient: "from-pink-500 to-yellow-300" },
    { path: "/books", label: "Books", gradient: "from-emerald-400 to-cyan-400", activeGradient: "from-green-300 to-blue-400" },
    { path: "/comics", label: "Comic", gradient: "from-emerald-400 to-cyan-400", activeGradient: "from-green-300 to-blue-400" },
    { path: "/mangas", label: "Mangas", gradient: "from-emerald-400 to-cyan-400", activeGradient: "from-green-300 to-blue-400" },
  ];

  return (
    <div className="w-full shadow-md py-4 relative">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto relative">

        {/* Logo a la izquierda */}
        <div className="w-48 flex-shrink-0 flex items-center justify-center z-10">
          <img
            src={logo}
            alt="ReactReads logo"
            className="h-auto w-48 object-contain cursor-pointer"
          />
        </div>

        {/* Menú centrado */}
        <nav className="absolute left-1/2 transform -translate-x-1/2 z-0">
          <ul className="p-2 flex bg-indigo-600 rounded-full">
            {links.map(({ path, label, gradient, activeGradient }) => (
              <li key={path}>
                <motion.div
                  initial={{ scale: 1 }}
                  animate={location.pathname === path ? { scale: 1.2 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block px-4 py-2" >
                  <Link
                    to={path}
                    className={`text-xl sm:text-2xl bg-clip-text bg-gradient-to-r font-extrabold text-transparent ${location.pathname === path ? activeGradient : gradient}`} >
                    {label}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Iconos a la derecha */}
        <IconContext.Provider value={{ verticalAlign: "middle", size: "28px" }}>
          <div className="w-60 flex-shrink-0 flex items-center justify-end gap-5 z-10">
            <button className="hover:text-indigo-500 transition cursor-pointer"
              onClick={() => navigate("/login")}
            >
              <FaCircleUser />
            </button>
            <button className="hover:text-indigo-500 transition cursor-pointer">
              <FaCartShopping />
            </button>
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default MenuBar;
