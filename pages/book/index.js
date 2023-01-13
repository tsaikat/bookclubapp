import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AddBook from "../../components/book/add";
import BookList from "../../components/book/booklist";
import axios from 'axios';
import { useSession } from "next-auth/react";

const Books = ( ) => {
  const [books, setBooks] = useState([]);
  const {data: session} = useSession();
  
  const bookListBlock = useRef('');

   useEffect( () => {
    
    axios.get(process.env.NEXT_PUBLIC_API_HOST + '/books', {
      headers: {
        Authorization: 'Bearer ' + session.token
      }})
      .then((res) => {
        setBooks(res.data);
      })
      .catch ((error) => {
        console.log(error);
        bookListBlock.current.className = "alert alert-danger text-center";
        bookListBlock.current.innerText = "Failed to render booklist: " + error.message;
      });
  }, [<AddBook/>]);


  return (        
        <div className="container mt-5">
          <AddBook/>
          <div ref={bookListBlock}> 
          <BookList books={books}/>
          </div>
        </div>
     );
}

export default Books;