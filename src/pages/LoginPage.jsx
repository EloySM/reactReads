import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [userExistError, setUserExistError] = useState(""); // Para errores de login y registro
  const [isRegister, setIsRegister] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const allFieldsFilled = isRegister
    ? formData.name &&
      formData.email &&
      formData.username &&
      formData.password &&
      formData.confirmPassword
    : formData.username && formData.password;

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    setFormData({
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
    setPasswordError("");
    setUserExistError("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (isRegister) {
        if (formData.password !== formData.confirmPassword) {
          setPasswordError("Las contraseñas no coinciden.");
          return;
        }
        setPasswordError("");

        const res = await fetch(
          `http://localhost:3001/api/user/exist?username=${formData.username}&email=${formData.email}`
        );
        const data = await res.json();

        if (data.exists) {
          setUserExistError("Este usuario o correo ya está registrado.");
          return;
        }

        setUserExistError("");

        const registerRes = await fetch(
          "http://localhost:3001/api/user/sign_up",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              username: formData.username,
              email: formData.email,
              password: formData.password,
            }),
          }
        );
        const registerData = await registerRes.json();

        if (registerRes.ok) {
          console.log("Usuario registrado con éxito");
          setIsRegister(false);
          setFormData({
            name: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
          });
        } else {
          setUserExistError(registerData.message || "Error en el registro.");
        }
      } else {
        const loginRes = await fetch("http://localhost:3001/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });

        const loginData = await loginRes.json();

        if (loginRes.ok) {
          setUser(loginData.user);
          localStorage.setItem("user", JSON.stringify(loginData.user));
          navigate("/");
        } else {
          setUserExistError(loginData.message || "Error en el login.");
        }
      }
    } catch (e) {
      console.error("Error en la operación:", e);
      setUserExistError("Ocurrió un error. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
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
                  value={formData.name}
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
                  value={formData.email}
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
              value={formData.username}
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
                } rounded-md focus:outline-none focus:ring-2`}
              />
              {passwordError && (
                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
              )}
            </div>
          )}

          {/* Error visible tanto en login como en registro */}
          {userExistError && (
            <p className="mb-4 text-sm text-red-600 text-center">
              {userExistError}
            </p>
          )}

          <button
            type="submit"
            disabled={!allFieldsFilled || loading}
            className={`w-full py-2 rounded-md flex items-center justify-center gap-2 transition ${allFieldsFilled && !loading
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-indigo-600/80 text-white cursor-not-allowed"
              }`}
          >
            {loading ? (
              <motion.div className="flex items-center gap-0.5">
                <span className="font-medium">Cargando</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-3xl"
                >.</motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  className="text-3xl"
                >.</motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  className="text-3xl"
                >.</motion.span>
              </motion.div>
            ) : isRegister ? "Registrar" : "Iniciar sesión"}
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
