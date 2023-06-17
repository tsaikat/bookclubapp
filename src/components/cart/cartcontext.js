import { createContext, useState } from "react";


const CartContext = createContext();

export const CartProvider = ( {children} ) => {
    const [items, setItems] = useState([]);
        
    const addToCart = ( book ) => {
        setItems((prevState) => [...prevState, book]);
    };

    const removeFromCart = (item) => {
        setItems((prevState) => [
            ...prevState.slice(0, prevState.indexOf(item)),
            ...prevState.slice(prevState.indexOf(item) + 1)
        ]);
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