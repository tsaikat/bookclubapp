import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import CartIcon from '../cart/carticon';
import { NavDropdown } from 'react-bootstrap';
import { useSession, signIn, signOut, getProviders } from 'next-auth/react';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <Navbar expand="lg" className='navbar navbar-expand-lg navbar-dark bg-dark p-3'>
      <Navbar.Brand href="/"><h1>Bookclub</h1></Navbar.Brand>        
      <Navbar.Toggle className='p-2' />
      <Navbar.Collapse>
        <Nav className="ms-auto">
          {(status === 'authenticated') ? ( <>
          <Link href="/" className="nav-link"> Home</Link>
          <NavDropdown title="Books">
            <NavDropdown.Item href="/book"> List of books</NavDropdown.Item>
            <NavDropdown.Item href="/book"> Add a book</NavDropdown.Item>
            <NavDropdown.Item href="/book/search">Search Book</NavDropdown.Item>
          </NavDropdown>
          <Link href="/member" className="nav-link"> Members</Link>
          <Link href="/borrowing" className="nav-link"> Borrowings</Link>
          <CartIcon/>
          <div style={{padding:"5px"}}></div>
          <button type="button" onClick={() => signOut()} className="btn btn-outline-light me-auto"> Logout </button> </>)
          : (<button onClick={() => signIn()} className="btn btn-outline-light me-auto"> Login </button>)}
        </Nav>
      </Navbar.Collapse>  
  </Navbar>
  );
}
 
export default Header;