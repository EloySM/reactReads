import "../styles/App.css";
import BookCardNews from "../components/news/BookCardNews";

function News() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <div>
        <div className="flex justify-center mt-36">
          <BookCardNews />
        </div>
      </div>
    </div>
  );
}

export default News;