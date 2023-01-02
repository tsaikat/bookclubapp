import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="navbar-brand">
        <h1>Bookclub</h1>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/member" className="nav-link">
              Members
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/book" className="nav-link">
              Books
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/borrowing" className="nav-link">
              Borrowings
            </Link>
          </li>
        </ul>
      </div>
    </nav>
     );
}
 
export default Navbar;