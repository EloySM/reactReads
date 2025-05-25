import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/App.css";
import { IconContext } from "react-icons";
import { FaCartShopping, FaCircleUser } from "react-icons/fa6";
import logo from "../assets/img/profile.png";
import { useState, useEffect, useRef, useCallback } from "react";

function MenuBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const timeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const userButtonRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.name || user.username || "");
    }
  }, []);

  const userInitials = username
    ? username
        .replace(/[^a-zA-Z]/g, " ")
        .split(" ")
        .filter(Boolean)  // Eliminar vacíos
        .map((word) => word[0]) // Coge la primera letra
        .join("")
        .slice(0, 2)  // Máximo dos letras
        .toUpperCase()
    : "";

  const links = [
    {
      path: "/",
      label: "News",
      gradient: "from-orange-600 to-yellow-300",
      activeGradient: "from-pink-500 to-yellow-300",
    },
    {
      path: "/books",
      label: "Books",
      gradient: "from-emerald-400 to-cyan-400",
      activeGradient: "from-green-300 to-blue-400",
    },
    {
      path: "/comics",
      label: "Comic",
      gradient: "from-emerald-400 to-cyan-400",
      activeGradient: "from-green-300 to-blue-400",
    },
    {
      path: "/mangas",
      label: "Mangas",
      gradient: "from-emerald-400 to-cyan-400",
      activeGradient: "from-green-300 to-blue-400",
    },
  ];

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDropdownVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownVisible(false);
    }, 200);
  }, []);

  // Cierra dropdown si se hace click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    }
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownVisible]);

  return (
    <div className="w-full shadow-md py-4 relative">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto relative">
        {/* Logo */}
        <div
          className="w-48 flex-shrink-0 flex items-center justify-center z-10 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="ReactReads logo"
            className="h-auto w-48 object-contain"
          />
        </div>

        {/* Menú */}
        <nav className="absolute left-1/2 transform -translate-x-1/2 z-0">
          <ul className="p-2 flex bg-indigo-600 rounded-full">
            {links.map(({ path, label, gradient, activeGradient }) => (
              <li key={path}>
                <motion.div
                  initial={{ scale: 1 }}
                  animate={
                    location.pathname === path ? { scale: 1.2 } : { scale: 1 }
                  }
                  transition={{ duration: 0.2 }}
                  className="inline-block px-4 py-2"
                >
                  <Link
                    to={path}
                    className={`text-xl sm:text-2xl font-extrabold bg-clip-text bg-gradient-to-r text-transparent ${
                      location.pathname === path ? activeGradient : gradient
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Iconos usuario y carrito */}
        <IconContext.Provider value={{ verticalAlign: "middle", size: "28px" }}>
          <div className="w-60 flex-shrink-0 flex items-center justify-end gap-5 z-10 relative">
            {username ? (
              <>
                {/* Overlay que atenua todo menos el botón user */}
                <AnimatePresence>
                  {isDropdownVisible && (
                    <motion.div
                      key="page-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black z-20 pointer-events-none"
                      // pointer-events-none para que clics pasen a elementos debajo
                    />
                  )}
                </AnimatePresence>

                <div
                  className="relative z-30"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  ref={dropdownRef}
                >
                  <div
                    className="hover:text-indigo-500 transition cursor-pointer flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg w-10 h-10 select-none"
                    ref={userButtonRef}
                  >
                    {userInitials}
                  </div>

                  <AnimatePresence>
                    {isDropdownVisible && (
                      <motion.div
                        key="dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-3 w-70 bg-white rounded-xl shadow-xl border border-gray-200 z-30 select-none"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        {/* Flecha (vise) */}
                        <div className="absolute top-[-6px] right-4 w-3 h-3 bg-white rotate-45 rounded-xs" />

                        <div className="p-5">
                          <div className="font-semibold text-gray-800 text-sm mb-4">
                            Account
                          </div>
                          <ul className="space-y-3 text-sm text-gray-700">
                            <li>
                              <button 
                                className="hover:text-indigo-600 hover:underline w-full text-left transition"
                                onClick={() => navigate("/profile")}>
                                Your Account
                              </button>
                            </li>
                            <li>
                              <button className="hover:text-indigo-600 hover:underline w-full text-left transition">
                                Your Orders
                              </button>
                            </li>
                            <li>
                              <button className="hover:text-indigo-600 hover:underline w-full text-left transition">
                                Your Lists
                              </button>
                            </li>
                            <li>
                              <button className="hover:text-indigo-600 hover:underline w-full text-left transition">
                                Manage Content
                              </button>
                            </li>
                            <li>
                              <button className="hover:text-red-600 hover:underline w-full text-left transition">
                                Sign Out
                              </button>
                            </li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <button
                className="hover:text-indigo-500 transition cursor-pointer flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg w-10 h-10"
                aria-label="Login"
                onClick={() => navigate("/login")}
              >
                <FaCircleUser />
              </button>
            )}

            {/* Carrito */}
            <button
              className="hover:text-indigo-500 transition cursor-pointer"
              aria-label="Shopping Cart"
              onClick={() => navigate("/cart")}
            >
              <FaCartShopping />
            </button>
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default MenuBar;
