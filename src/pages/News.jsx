import "../styles/App.css";
import BookCard from "../components/BookCard";


function News() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* <MenuBar /> */}
      <div>
        <div className="flex justify-center mt-36">
          <BookCard />
        </div>
      </div>
    </div>
  );
}

export default News;
