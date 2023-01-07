import axios from "axios";
import { useEffect, useState } from "react";
import BookList from "../../components/book/booklist";

const CreateBorrowing = () => {
    const [searchTxt, setSearchTxt] = useState(null);
    const [books, setBooks] = useState([]);

    async function getBooksbyAuthor () {
        const result = await axios.get(process.env.NEXT_PUBLIC_API_HOST + "/books/author?name=" + searchTxt)
                            .then(res => res.data)
                            .catch(error => null);
        setBooks(result);
    }

    useEffect( () => {
        getBooksbyAuthor();
    },[searchTxt]);

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchTxt(event.target.value);
    }

    return ( 
        <div>
            <div className="input-group container p-3 justify-content-center">
            <input type="search" 
                className="form-control shadow-lg" 
                placeholder="Search by author" 
                style={{"max-width": "300px"}}
                onChange={handleSearch}/>

            <button type="button" 
                className="btn btn-dark shadow-lg" 
                onClick={handleSearch}> Search
            </button>
            </div>            
            <div><BookList books={books}/></div>
        </div>

     );
}
 
export default CreateBorrowing;