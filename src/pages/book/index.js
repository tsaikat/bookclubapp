import { useEffect, useRef, useState } from "react";
import AddBook from "../../components/book/add";
import BookList from "../../components/book/booklist";
import { useSession } from "next-auth/react";
import api from "@/classes/api";

const Books = () => {
  const [books, setBooks] = useState([]);
  const { data: session } = useSession();
  const [toggle, setToggle] = useState(true);

  const bookListBlock = useRef("");

  useEffect(() => {
    api.get("/books")
      .then((res) => {
        if (!res.ok) throw Error(res.status);
        setBooks(res.data);
      })
      .catch((error) => {
        bookListBlock.current.className = "alert alert-danger text-center";
        bookListBlock.current.innerText =
          "Failed to render booklist: " + error.message;
      });
  }, [toggle]);

  return (
    <div className="container mt-5">
      <AddBook toggle={toggle} setToggle={setToggle} />
      <div ref={bookListBlock}>
        <BookList books={books} toggle={toggle} setToggle={setToggle} />
      </div>
    </div>
  );
};

export default Books;