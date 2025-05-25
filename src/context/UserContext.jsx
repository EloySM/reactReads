import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Crear el contexto
export const UserContext = createContext(null);

// Componente proveedor del contexto
export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Intentamos cargar el usuario desde localStorage al inicio
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Cada vez que el usuario cambie, lo guardamos en localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
