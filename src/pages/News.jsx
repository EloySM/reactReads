import "../styles/App.css";
import BookCardNews from "../components/news/BookCardNews";

function News() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <h1 className="text-3xl font-extrabold mt-24 ml-95">Latest release</h1>
      <div>
        <div className="flex justify-center mt-6">
          <BookCardNews />
        </div>
      </div>
    </div>
  );
}

export default News;