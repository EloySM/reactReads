import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function LoginPage() {
  const [loading, setLoading] = useState();
  const [userExistError, setUserExistError] = useState(false); // Se utilizará para mostrar un texto de error
  const [isRegister, setIsRegister] = useState(false);  // Para comprobar si esta en el apartado de login o de sing up
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "", // Se añade confirmación de contraseña
  });

  // variable para mensaje de error
  const [passwordError, setPasswordError] = useState("");

  // Guardar si todos los campos tienen datos o no
  const allFieldsFilled = isRegister
    ? formData.name &&
    formData.email &&
    formData.username &&
    formData.password &&
    formData.confirmPassword
    : formData.username && formData.password;

  const toggleMode = () => {
    // Para indicar que se cambio de login a registro de usuario
    // Esto no está poniendo en false todo el tiempo a la variable isRegister, en realidad solo la cambia si es true a false y si es false a true
    setIsRegister((prev) => !prev);
    // Se resetean los campos
    setFormData({
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "", // Se resetea también el campo nuevo
    });

    // El error tambien se elimina
    setPasswordError("");
  };

  const handleChange = (event) => {
    setFormData((prev) => ({
      // En caso de haber cambios se actualizará solo en donde los haya habido. Con ...prev, lo que hago es que los que no hayan sufrido cambios queden igual copiando el anterior valor del input otra para que no se reinicie con esta función
      // Ejemplo cambio la contraseña porque me equivoqué, el valor de username no se reinicia, lo deja igual.
      // name hace referencia al atributo (name, username, contraseña...) y value hace referencia al valor (Eloy, eloy_dev_sm, eloy006.)
      // ...prev son todos aquellos campos que no se han cambiado
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isRegister) {
      // Se valida que ambas contraseñas coincidan
      if (formData.password !== formData.confirmPassword) {
        setPasswordError("Las contraseñas no coinciden.");
        return; // Para que salga de la funcion y no llegue al console.log
      }

      // Limpiar mensaje de error
      setPasswordError("");

      try {
        // Pasamos el username y el email para comprobar si el usuario existe
        const res = await fetch(`http://localhost:3001/api/user/exist?username=${formData.username}&email=${formData.email}`);
        const data = await res.json();

        if (data.exists) {
          setUserExistError("Este usuario o correo ya está registrado.");
          return;
        }

        setUserExistError(""); // Limpiar si no hay error

        // Aquí continúa el registro normalmente
        console.log("Registrando usuario:", formData);

      } catch (e) {
        console.error("Error al verificar el usuario llamando a la api:", e);
        setUserExistError("Error al verificar el usuario.");
      }
      console.log("Registrando usuario:", formData);

      try {
        const res = await fetch("http://localhost:3001/api/user/sign_up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            username: formData.username,
            email: formData.email,
            password: formData.password
          })
        });
        const data = await res.json();

        if (res.ok) {
          console.log("Usuario registrado con éxito");
        } else {
          console.log("Error en el registro:", data.message);
        }
      } catch (e) {
        console.log("Error al llamar a la api para crear usuario: ", e)
      }
    } else {
      console.log("Logueando usuario:", formData);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg mt-10 text-black">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isRegister ? "Registro" : "Iniciar sesión"}
      </h2>

      <AnimatePresence mode="wait">
        <motion.form
          key={isRegister ? "register" : "login"}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          {isRegister && (
            <>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">
                  Nombre completo:
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name} // Establece el valor actual con el que está guardado
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre completo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
                  Correo electrónico:
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email} // Establece el valor actual con el que está guardado
                  onChange={handleChange}
                  required
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 font-semibold text-gray-700">
              Usuario:
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username} // Establece el valor actual con el que está guardado
              onChange={handleChange}
              required
              placeholder="Tu usuario"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">
              Contraseña:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Tu contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {isRegister && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-2 font-semibold text-gray-700">
                Repetir contraseña:
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Repite tu contraseña"
                className={`w-full px-4 py-2 border ${passwordError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
                  } rounded-md focus:outline-none focus:ring-2`} />

              {/* Por alguna razon que desconozcon esto funciona de la siguiente manera:
                  Evalua si passwordError tine contenido y si lo tiene significa que es true, entonces se mostrara el mensaje, de lo contrario no */}
              {passwordError && ( // Esta forma es más limpia que un operador ternario porque no tengo que indicar el caso contrario como null
                <p className="mt-2 test-sm text-red-600">{passwordError}</p>
              )}

              {userExistError && (  // A este tipo de condicional se le llama Short-circuit evaluation o Renderizado condicional con operador lógico AND, que locura de nombre, menudo desfase, sefuro estaban motivados cando o puxeron 🫤.
                <p className="mt-2 test-sm text-red-600">{userExistError}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={!allFieldsFilled}
            className={`w-full py-2 rounded-md transition ${allFieldsFilled
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-indigo-600/80 text-white cursor-not-allowed"
              }`}
          >
            {isRegister ? "Registrar" : "Iniciar sesión"}
          </button>
        </motion.form>
      </AnimatePresence>

      <button
        onClick={toggleMode}
        className="mt-4 text-indigo-600 hover:underline w-full text-center"
      >
        {isRegister
          ? "¿Ya tienes cuenta? Inicia sesión"
          : "¿No tienes cuenta? Regístrate"}
      </button>
    </div>
  );
}

export default LoginPage;
