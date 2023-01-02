import Link from "next/link";

const Error404 = () => {
    return ( 
    <div className="text-center font-weight-bold text-dark pb-lg-5">
    <h1>404 | Not Found</h1>
    <h1>Return <Link href='/'>Home</Link></h1>
    </div>
     );
}
 
export default Error404;