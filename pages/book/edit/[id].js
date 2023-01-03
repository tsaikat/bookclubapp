import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

export async function getServerSideProps( {query} s) {

  const {id} = query;

  const data = await axios
    .get(process.env.NEXT_PUBLIC_API_HOST + '/books/' + id)
    .then((res) => res.data)
    .catch((error) => null);
    
  return {
    props: { data, id }
  };
}


const EditBook = ( {data, id} ) => {

  if (data === null) {
      return (
          <div className="alert alert-danger" role="alert"> No such book exists!</div>
      );
  }

  const [book, setBook] = useState(data);
  const actionMsg = useRef(null);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook((book) => ({
        ...book,
        [name]: value
    }));
  };
    
    
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(process.env.NEXT_PUBLIC_API_HOST + "/books/" + id, book)
      .then((response) => {
          actionMsg.current.className = "alert alert-success";
          actionMsg.current.innerText = response.data.bookTitle + " was successfully updated";
      }) 
      .catch((error) => {
          actionMsg.current.className = "alert alert-danger";
          actionMsg.current.innerText = "Something went wrong. Please try again correctly";
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
      <h4 className="card-title mb-3 text-primary text-uppercase text-dark">Edit Book</h4>
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
              required 
              value = {book.bookTitle}
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
              required
              value = {book.author} 
              className="form-control form"
              onChange ={handleChange} />
              <label htmlFor="author">Author</label>
            </div>
          </div>
        <div className="col">
        <div className="form-floating mb-3">
          <input 
          type="text" 
          id="genre"
          name = "genre"
          required
          value = {book.genre}
          className="form-control"
          onChange = {handleChange}
          /> 
          <label htmlFor="genre">Genre</label>
        </div>
        </div>
      </div>
        <div className="col">
        <button type="submit" className="btn btn-dark ml-auto">Submit Edit</button>
        </div>
        </form>
    </div>
  </div>
  </div>
  </>
        );
    }
 
export default EditBook;