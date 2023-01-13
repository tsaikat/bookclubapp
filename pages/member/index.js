import { useEffect, useState, useRef } from "react";
import MemberList from "../../components/member/memberlist";
import axios from 'axios';
import AddMember from "../../components/member/add";
import { useSession } from "next-auth/react";


const Members = () => {
    
    const [members, setMembers] = useState([]);
    const {data: session} = useSession();
    
    const memberListBlock = useRef('');

    
    useEffect( () => {
        axios.get(process.env.NEXT_PUBLIC_API_HOST + '/members', {
            headers: {
                Authorization: 'Bearer ' + session.token
            }})
            .then(res => {
                setMembers(res.data);
            })
            .catch( (error) => {
                memberListBlock.current.className = "alert alert-danger text-center";
                memberListBlock.current.innerText = "Failed to render Members List: " + error.message;
            })
    }, [<AddMember/>] );

    return ( 
    <div className="container mt-5">
        <AddMember/>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="card-title mb-4 text-uppercase text-dark">List of Members</h3> 
        </div>
        <div ref={memberListBlock}>
            <MemberList members ={members}/>
        </div>
    </div>
    );
}
 
export default Members;