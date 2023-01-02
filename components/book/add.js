import React, { useState, useRef, use } from 'react';
import axios from 'axios';


const AddBook = () => {
  const [formData, setFormData] = useState({
    bookTitle: "",
    author: "",
    genre: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value
    }));
  };

  const actionMsg = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(process.env.NEXT_PUBLIC_API_HOST + "/books", formData)
      .then((response) => {
        actionMsg.current.className = "alert alert-success";
        actionMsg.current.innerText = response.data.bookTitle + " was successfully added";
        setFormData({ bookTitle: '', author: '', genre: '' });
      }) 
      .catch((error) => {
        actionMsg.current.className = "alert alert-danger";
        actionMsg.current.innerText = "Something went wrong. Please try again correctly";
      });

      setTimeout(() => {
        actionMsg.current.className = '';
        actionMsg.current.innerText = '';
      }, 5000);

  };

  return (
    <>
    <div className="container p-5">
    <div className="card mx-3 mt-n5 shadow-lg">
    <div className="card-body">
      <h4 className="card-title mb-3 text-primary text-uppercase text-dark">Add a Book</h4>
      <div ref={actionMsg} className="" role="alert"></div>
      
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <div className="form-floating mb-3">
              <input 
              type="text"
              id ="title"
              name ="bookTitle"
              className="form-control" 
              value = {formData.bookTitle}
              onChange = {handleChange} 
              />
              <label htmlFor="title">Title</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating mb-3">
              <input 
              type="text"
              id = "author"
              name = "author"
              value = {formData.author} 
              className="form-control form"
              onChange ={handleChange}
              />
              <label htmlFor="author">Author</label>
            </div>
          </div>
        <div className="col">
        <div className="form-floating mb-3">
          <input 
          type="text" 
          id="genre"
          name = "genre"
          value = {formData.genre}
          className="form-control"
          onChange = {handleChange}
          /> 
          <label htmlFor="genre">Genre</label>
        </div>
        </div>
      </div>
        <div className="col">
        <button type="submit" className="btn btn-primary ml-auto">Add</button>
        </div>
        </form>
    </div>
  </div>
  </div>
  </>
  );
}



export default AddBook;