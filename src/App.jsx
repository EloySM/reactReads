import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News from "./pages/News";
import Books from "./pages/Books";
import ComicsMangas from "./pages/ComicsMangas";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <div className="bg-neutral-900 min-h-screen">
    <Router>
        <MenuBar />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/books" element={<Books />} />
        <Route path="/comicsMangas" element={<ComicsMangas />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
