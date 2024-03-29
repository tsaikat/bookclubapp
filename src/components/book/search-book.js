import { useEffect, useState } from "react";
import BookList from "./booklist";
import api from "@/classes/api";

const SearchBook = () => {
  const [searchTxt, setSearchTxt] = useState(null);
  const [books, setBooks] = useState([]);

  async function getBooksbyAuthor() {
    const result = await api
      .get("/books/author?name=" + searchTxt)
      .then((res) => res.data)
      .catch(() => []);
    setBooks(result);
  }

  useEffect(() => {
    getBooksbyAuthor();
  }, [searchTxt]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTxt(event.target.value);
  };

  return (
    <div>
      <div className="input-group container p-3 justify-content-center">
        <input
          type="search"
          className="form-control shadow-lg"
          placeholder="Search by author"
          style={{ maxWidth: "300px" }}
          onChange={handleSearch}
        />

        <button
          type="button"
          className="btn btn-dark shadow-lg"
          onClick={handleSearch}
        >
          {" "}
          Search
        </button>
      </div>
      <div className="container justify-content-center">
        <BookList books={books} />
      </div>
    </div>
  );
};

export default SearchBook;
