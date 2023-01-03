import { useEffect, useState, useRef } from "react";
import MemberList from "../../components/member/memberlist";
import axios from 'axios';
import AddMember from "../../components/member/add";


const Members = () => {
    
    const [members, setMembers] = useState([]);
    
    const memberListBlock = useRef('');

    
    useEffect( () => {
        axios.get(process.env.NEXT_PUBLIC_API_HOST + '/members')
            .then(res => {
                setMembers(res.data);
            })
            .catch( (error) => {
                memberListBlock.current.className = "alart alert-danger text-center";
                memberListBlock.current.innerText = "Failed to render Members List: " + error.message;
            })
    }, [<AddMember/>] );

    return ( 
    <div className="container mt-5">
        <AddMember/>
        <div ref={memberListBlock}>
            <MemberList members ={members}/>
        </div>
    </div>
    );
}
 
export default Members;