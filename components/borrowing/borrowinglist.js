import Link from "next/link";
import axios from 'axios';
import  { useRef } from 'react';


const BorrowingList = ( {borrowings} ) => {

    const actionMsg = useRef(null);

    const handleDeleteButton = (borrowing) => {
        axios.delete(process.env.NEXT_PUBLIC_API_HOST + '/borrowings/' + borrowing.borrowingId )
        .then(res => {
            actionMsg.current.className = "alert alert-success";
            actionMsg.current.innerText = "Borrowing ID: " + borrowing.borrowingId + " was deleted successfully";
        })
        .catch(error => {
            actionMsg.current.className = "alert alert-danger";
            actionMsg.current.innerText = "Failed to delete! Try again";
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
          <h3 className="card-title mb-4 text-uppercase text-dark">List of Borrowings</h3> 
        </div>
        <table className="table table-hover tab container shadow-lg rounded-top p-lg-5">
          <thead className="bg-dark-subtle rounded-top">
            <tr>
              <th>ID</th>
              <th>Borrower</th>
              <th>Borrowing Date</th>
              <th>No of Books</th>
              <th>Cost</th>
              <th>Returned</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {borrowings.map(b => (
                <tr key ={b.borrowingId}>
                    <th>{b.borrowingId}</th>
                    <th>{b.borrower}</th>
                    <th>{b.borrowDate.slice(0,10)}</th>
                    <th>{b.borrowedBooks.length}</th>
                    <th>{b.cost}</th>
                    <th> {b.returnDate ? b.returnDate.slice(0,10) : ( 
                        <Link href={"/TODO" + b.borrowingId} 
                            className="btn btn-outline-dark" 
                            role ="button"> Return 
                            </Link>
                        )}
                    </th>
                    <th>
                        <button
                        className="btn btn-outline-dark"  
                        onClick={() => handleDeleteButton(b)}>
                             Delete 
                        </button>
                    </th>
                </tr>
            ))}
          </tbody>
        </table>
        </>
     );
}
 
export default BorrowingList;