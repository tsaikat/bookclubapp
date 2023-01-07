import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';

const Header = () => {
    return (
      <Navbar expand="lg" className='navbar navbar-expand-lg navbar-dark bg-dark p-3'>
        <Navbar.Brand href="/"><h1>Bookclub</h1></Navbar.Brand>
        <Navbar.Toggle className='p-2' />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Link href="/" className="nav-link"> Home</Link>
            <Link href="/book" className="nav-link"> Books</Link>
            <Link href="/member" className="nav-link"> Members</Link>
            <Link href="/borrowing" className="nav-link"> Borrowings</Link>
            <Link type="button" href="#" className="btn btn-outline-light"> Login</Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
     );
}
 
export default Header;