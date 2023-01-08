import Link from "next/link";
import axios from 'axios';
import  { useRef } from 'react';
import SearchMember from "./search";

const MemberList = ( {members} ) => {

    const actionMsg = useRef(null);

    const handleDeleteButton = (member) => {
        axios.delete(process.env.NEXT_PUBLIC_API_HOST + '/members/' + member.id )
        .then(res => {
            actionMsg.current.className = "alert alert-success";
            actionMsg.current.innerText = member.firstName + " " + member.lastName + " was removed successfully";
        })
        .catch(error => {
            actionMsg.current.className = "alert alert-danger";
            actionMsg.current.innerText = member.firstName + " " + member.lastName + " failed to remove! Try again.";
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
        <table className="table table-hover tab container shadow-lg rounded-top p-lg-5">
          <thead className="bg-dark-subtle rounded-top">
            <tr>
              <th>Name</th>
              <th>Joined</th>
              <th>Balance</th>
              <th>Total Borrowings</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {members.map(m => (
                <tr key ={m.id}>
                    <th>{m.firstName + " " + m.lastName}</th>
                    <th>{m.joinDate.slice(0, 10)}</th>
                    <th>{m.balance}</th>
                    <th>{m.borrowings.length}</th>
                    <th>
                        <button
                        className="btn btn-outline-dark"  
                        onClick={() => handleDeleteButton(m)}>
                             Remove 
                        </button>
                    </th>
                    <th>
                        <Link href={"/member/balance/" + m.id } 
                        className="btn btn-outline-dark" 
                        role ="button"> Add balance 
                        </Link>
                    </th>
                </tr>
            ))}
          </tbody>
        </table>
        </>
     );
}
 
export default MemberList;