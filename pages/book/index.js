import Link from "next/link";
import { useEffect, useState } from "react";
import AddBook from "../../components/book/add";
import BookList from "../../components/book/booklist";
import axios from 'axios';

const Books = ( ) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_API_HOST + '/books')
      .then(res => {
        setBooks(res.data);
      });
  });

  return (        
        <div className="container mt-5">
          <AddBook/>
          <BookList books={books}/>
        </div>
     );
}

export default Books;