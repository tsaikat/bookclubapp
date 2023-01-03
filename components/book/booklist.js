import Link from "next/link";
import axios from 'axios';
import  { useRef } from 'react';


const BookList = ( {books} ) => {

    const actionMsg = useRef(null);

    const handleDeleteButton = (book) => {
        axios.delete(process.env.NEXT_PUBLIC_API_HOST + '/books/' + book.bookId )
        .then(res => {
            actionMsg.current.className = "alert alert-success";
            actionMsg.current.innerText = book.bookTitle + " was deleted successfully";
        })
        .catch(error => {
            actionMsg.current.className = "alert alert-danger";
            actionMsg.current.innerText = book.bookTitle + " failed to delete! Try again";
        });

        if (actionMsg.current) {
            setTimeout(() => {
              actionMsg.current.className = '';
              actionMsg.current.innerText = '';
            }, 5000);
        }
        
    };
    

    return ( 
        <>
        <div ref={actionMsg} className="" role="alart"></div>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="card-title mb-4 text-uppercase text-dark">List of Books</h2> 
        </div>
        <table className="table container">
          <thead className="table-dark pb-5">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map(b => (
                <tr key ={b.bookId}>
                    <th>{b.bookTitle}</th>
                    <th>{b.author}</th>
                    <th>{b.genre}</th>
                    <th>
                        <button
                        className="btn btn-outline-dark"  
                        onClick={() => handleDeleteButton(b)}>
                             Delete 
                        </button>
                    </th>
                    <th>
                        <Link href={"/book/edit/" + b.bookId } className="btn btn-outline-dark" role ="button"> Edit </Link>
                    </th>
                </tr>
            ))}
          </tbody>
        </table>
        </>
     );
}
 
export default BookList;