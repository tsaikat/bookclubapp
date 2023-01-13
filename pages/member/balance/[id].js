import axios from 'axios';
import React, { useRef, useState } from 'react';
import { getSession, useSession } from "next-auth/react";


export async function getServerSideProps( {query, req, res} ) {
    const {id} = query;
    const session = await getSession({req, res});
  
    const data = await axios
        .get(process.env.NEXT_PUBLIC_API_HOST + '/members/' + id, {
            headers: {
                Authorization: 'Bearer ' + session.token
            }})
        .then((res) => res.data)
        .catch((error) => null);
      
    return {
      props: { data, id}
    };
  }

  
const AddBalance = ( {data, id} ) => {

    if (data === null) {
        return (
            <div className="alert alert-danger" role="alert"> No such Member exists!</div>
        );
    }

    const [ balance, setBalance] = useState();
    const actionMsg = useRef(null);
    const renderBalance = useRef(data.balance);
    const {data: session} = useSession();


    const handleChange = (event) => {
        setBalance(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        data.balance = (parseInt(data.balance) +  parseInt(balance)).toString();
        
        axios.put(process.env.NEXT_PUBLIC_API_HOST + "/members/" + id, data, {
            headers: {
                Authorization: 'Bearer ' + session.token
            }})
            .then( (res) => {
                actionMsg.current.className = "alert alert-success";
                actionMsg.current.innerText = "Balance added successfully";
                setBalance('');
                renderBalance.current.innerText = data.balance;
            })
            .catch( (error) => {
                actionMsg.current.className = "alert alert-danger";
                actionMsg.current.innerText =  "Something went wrong. try again";
                data.balance = (parseInt(data.balance) -  parseInt(balance)).toString();
            });

        setTimeout(() => {
            if (actionMsg.current) {
                actionMsg.current.className = '';
                actionMsg.current.innerText = '';
            }
        }, 5000);

    }
    
    return (
        <>
    <div className="container p-5">
    <div className="card mx-3 mt-n5 shadow-lg">
    <div className="card-body">
      <h5 className="card-title mb-3 text-primary text-uppercase text-dark"> 
            {data.firstName + " " + data.lastName + "'s Current Balance: " }
            <strong ref={renderBalance} style={{color: "#85BB65" }}> {data.balance}</strong>
      </h5>
      <div ref={actionMsg} className="" role="alert"></div>
      
      <form onSubmit={handleSubmit}>
        <div className="row">
        <div className='col'>
        <div className="form-floating mb-3">
          <input 
          type="text" 
          id="balance"
          required
          value = {balance}
          className="form-control"
          onChange = {handleChange} /> 
          <label htmlFor="balance">Balance</label>
        </div>
        </div>
      </div>
        <div className="col">
        <button type="submit" className="btn btn-dark ml-auto">Add balance</button>
        </div>
        </form>
    </div>
  </div>
  </div>
  </>
     );
}
 
export default AddBalance;