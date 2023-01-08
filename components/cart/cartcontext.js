import { createContext, useState } from "react";


const CartContext = createContext();

export const CartProvider = ( {children} ) => {
    const [items, setItems] = useState([]);
        
    const addToCart = ( book ) => {
        setItems((prevState) => [...prevState, book]);
    };

    const removeFromCart = ( book ) => {
        setItems((prevState) => prevState.filter((item) => item !== book));
    };

    const cleanCart = () => {
        setItems([]);
    }
    
    return ( 
        <CartContext.Provider value={ {items, addToCart, removeFromCart, cleanCart} }>
            {children}
        </CartContext.Provider>
     );
}

 
export default CartContext;