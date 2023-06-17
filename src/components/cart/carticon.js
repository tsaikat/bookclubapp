import Link from "next/link";
import { useContext } from "react";
import CartContext from "./cartcontext";

const CartIcon = () => {
    const { items } = useContext(CartContext);
    
    return ( 
        <Link className="btn btn-outline-secondary me-auto" href="/checkout">
            Cart ({items.length})
        </Link>
     );
}
 
export default CartIcon;