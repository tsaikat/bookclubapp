import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import BorrowingList from "../../components/borrowing/borrowinglist";
import Link from "next/link";

const Borrowings = () => {
    const [borrowings, setBorrowings] = useState([]);
    const borrowingBlock = useRef('');
    useEffect( () => {
        axios.get(process.env.NEXT_PUBLIC_API_HOST + '/borrowings')
            .then ((res) => {
                setBorrowings(res.data);
            })
            .catch((error) => {
                borrowingBlock.current.className = "alert alert-danger text-center";
                borrowingBlock.current.innerText = "Failed to render borrowing list: " + error.message;
            })
    }, [<BorrowingList/>]);

    return ( 
        <div className="container mt-5" >
            <div className="d-flex flex-row-reverse bd-highlight">
                <Link href="/borrowing/create" type="button" className="btn btn-dark shadow">Create New Borrowing</Link>
            </div>
            <div ref={borrowingBlock}>
                <BorrowingList borrowings= {borrowings}/> 
            </div>
        </div>
     );
}
 
export default Borrowings;