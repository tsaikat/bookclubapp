import axios from 'axios';
import  { useContext, useRef } from 'react';
import CartContext from "../cart/cartcontext";
import { useSession } from "next-auth/react";



const BookList = ( {books} ) => {

    const { addToCart } = useContext(CartContext);

    const actionMsg = useRef(null);
    const {data: session} = useSession();


    const handleDeleteButton = (book) => {
        axios.delete(process.env.NEXT_PUBLIC_API_HOST + '/books/' + book.bookId, {
          headers: {
              Authorization: 'Bearer ' + session.token
          }})
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
          <h3 className="card-title mb-4 text-uppercase text-dark">List of Books</h3> 
        </div>
        <table className="table table-hover tab container shadow-lg rounded-top p-lg-5">
          <thead className="bg-dark-subtle rounded-top">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="">
            {books.map(b => (
                <tr key ={b.bookId}>
                    <td>{b.bookTitle}</td>
                    <td>{b.author}</td>
                    <td>{b.genre}</td>
                    <td>
                        <div>
                          <button
                          className="btn btn-outline-secondary btn-light"  
                          onClick={() => handleDeleteButton(b)}>
                              Delete 
                          </button>
                          
                          <span style={{padding: "10px"}}></span>
                          
                          <a href={"/book/edit/" + b.bookId} 
                          className="btn btn-outline-secondary btn-light" 
                          role ="button"> Edit 
                          </a>
                        </div>
                    </td>
                    <td>
                        <button
                        onClick={() => addToCart(b)}
                        className="btn btn-outline-dark">
                        Add to Cart 
                        </button>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
        </>
     );
}
 
export default BookList;