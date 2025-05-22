import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News from "./pages/News";
import Books from "./pages/Books";
import Comics from "./pages/Comics";
import Mangas from "./pages/Mangas";
import ProductPages from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <div className="bg-neutral-900 min-h-screen selection:bg-blue-700 selection:text-amber-200 text-white">
      <Router>
        {/* HEADER */}
        <header className="mx-4 md:mx-[10%] lg:mx-[15%] xl:mx-[10%] flex justify-between items-center p-2 relative">

          {/* Menu */}
          <MenuBar />

        </header>

        {/* ROUTES */}
        <main>
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/books" element={<Books />} />
            <Route path="/comics" element={<Comics />} />
            <Route path="/mangas" element={<Mangas />} />
            <Route path="/book/:id" element={<ProductPages />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
