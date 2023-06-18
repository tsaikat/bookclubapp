import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import BorrowingList from "../../components/borrowing/borrowinglist";
import { useSession } from "next-auth/react";

const Borrowings = () => {
    const [borrowings, setBorrowings] = useState([]);
    const borrowingBlock = useRef('');
    const {data: session} = useSession();
    const [toggle, setToggle] = useState(true)

    useEffect( () => {
        axios.get(process.env.NEXT_PUBLIC_API_HOST + '/borrowings', {
            headers: {
                Authorization: 'Bearer ' + session.token
            }})
            .then ((res) => {
                setBorrowings(res.data);
            })
            .catch((error) => {
                borrowingBlock.current.className = "alert alert-danger text-center";
                borrowingBlock.current.innerText = "Failed to render borrowing list: " + error.message;
            })
    }, [toggle]);

    return ( 
        <div className="container mt-5" >
            <div ref={borrowingBlock}>
                <BorrowingList borrowings= {borrowings} toggle= {toggle} setToggle={setToggle}/> 
            </div>
        </div>
     );
}
 
export default Borrowings;