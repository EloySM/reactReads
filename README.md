# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

🧱 NOMBRE DE LA ARQUITECTURA
Arquitectura modular basada en capas (inspirada en MVC, pero más práctica para APIs).

📂 ESTRUCTURA GENERAL DEL PROYECTO

backend/
├── app.js                  # Punto de entrada de tu servidor Express
├── controllers/            # Lógica del controlador: gestiona la petición y prepara la respuesta
│   └── booksController.js
├── routes/                 # Define las rutas que pueden ser accedidas desde el frontend
│   └── bookRoutes.js
├── queries/                # Consultas SQL organizadas por entidad (acceso a datos)
│   └── books.js
├── .env                    # Variables de entorno (credenciales, puertos, etc.)
├── package.json

🧩 EXPLICACIÓN DE CADA CAPA
1. app.js (Punto de entrada)
Inicializa Express.

Conecta a PostgreSQL.

Usa middlewares como cors() y express.json().

Carga las rutas.

Inicia el servidor en un puerto.

📌 Responsabilidad: configurar la app y arrancar el servidor.

2. routes/ (Capa de rutas)
Se encarga de asociar endpoints HTTP con controladores.

📌 Responsabilidad: definir qué función se ejecuta cuando se llama una ruta específica.

3. controllers/ (Capa de controladores)
Ejecuta la lógica de la petición: por ejemplo, recibe un ID de libro, llama a la base de datos, maneja errores, y devuelve la respuesta al cliente.

📌 Responsabilidad: lógica de negocio + manejar respuesta HTTP.

4. queries/ (Capa de acceso a datos)
Contiene las consultas SQL que se ejecutan en la base de datos.

📌 Responsabilidad: separar las consultas SQL para reutilizarlas fácilmente.

5. (Opcional) models/
En proyectos más grandes, puedes tener una capa de modelos para definir entidades (por ejemplo, si usas ORMs como Sequelize o Prisma).

✅ VENTAJAS DE ESTA ARQUITECTURA
Ventaja	Descripción
🔄 Reutilizable	Puedes usar los controladores y queries desde varios puntos.
🧹 Limpia	Cada archivo tiene una sola responsabilidad.
🧪 Testeable	Puedes testear controladores o queries por separado.
📦 Escalable	Puedes agregar nuevos módulos (usuarios, productos, etc.) fácilmente.

📌 ¿Es MVC?
Parecido, pero más flexible para APIs:

M (Model): tus consultas SQL (queries/).

V (View): no hay vistas en APIs REST, la vista es el JSON.

C (Controller): tus funciones en controllers/.

Se parece a MVC, pero con una estructura orientada a APIs, no a renderizar HTML.