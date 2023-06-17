import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";



const AddMember = ({ toggle, setToggle }) => {

    const actionMsg = useRef(null);
    const {data: session} = useSession();


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        balance: ""
      });
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value
        }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(process.env.NEXT_PUBLIC_API_HOST + "/members", formData, {
            headers: {
                Authorization: 'Bearer ' + session.token
            }})
            .then((response) => {
              setToggle(!toggle);
                actionMsg.current.className = "alert alert-success";
                actionMsg.current.innerText = response.data.firstName + " " + response.data.lastName  + " was successfully added";
                setFormData({ firstName: '', lastName: '', balance: '' });
            }) 
            .catch((error) => {
                actionMsg.current.className = "alert alert-danger";
                actionMsg.current.innerText = "Something went wrong. Please try again correctly";
            });

            setTimeout(() => {
                if (actionMsg.current) {
                    actionMsg.current.className = "";
                    actionMsg.current.innerText = "";
                }
            }, 5000);
    };



    return ( 
        <>
    <div className="container p-5">
    <div className="card mx-3 mt-n5 shadow-lg">
    <div className="card-body">
      <h4 className="card-title mb-3 text-primary text-uppercase text-dark">Add a Member</h4>
      <div ref={actionMsg} className="" role="alert"></div>
      
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <div className="form-floating mb-3">
              <input 
              type="text"
              id ="firstName"
              name ="firstName"
              className="form-control" 
              required
              value = {formData.firstName}
              onChange = {handleChange} 
              />
              <label htmlFor="firstName">First Name</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating mb-3">
              <input 
              type="text"
              id = "lastName"
              name = "lastName"
              required
              value = {formData.lastName} 
              className="form-control form"
              onChange ={handleChange}
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
          </div>
        <div className='col'>
        <div className="form-floating mb-3">
          <input 
          type="text" 
          id="balance"
          name = "balance"
          required
          value = {formData.balance}
          className="form-control"
          onChange = {handleChange}
          /> 
          <label htmlFor="balance">Balance</label>
        </div>
        </div>
      </div>
        <div className="col">
        <button type="submit" className="btn btn-dark ml-auto">Add</button>
        </div>
        </form>
    </div>
  </div>
  </div>
  </>
     );
}
 
export default AddMember;