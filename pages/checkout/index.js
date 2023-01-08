import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../components/cart/cartcontext";
import SearchMember from "../../components/member/search";

const Checkout = () => {
    const { items, removeFromCart, cleanCart } = useContext(CartContext);
    const [targetMember, setTargetMember] = useState({});
    
    const [disableButton, setDisableButton] = useState('true');
    const router= useRouter();

    const updateTargetMember = (member) => {
        setTargetMember(member);
    };


    useEffect ( () => {
        if (items.length > 0 && targetMember.hasOwnProperty("firstName")) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }, [items, targetMember]);


    const handleCheckout = async () => {
        const borrowedBooks = items.map(item => item.bookId)
        
        const data = {
            borrowedBooks: [...borrowedBooks],
            borrower: targetMember.id,
            cost: items.length * 10
          }
        
        const body = JSON.stringify(data);

        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        };

        console.log(body);
        await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/borrowings', body, config)
                .then(() => {
                    cleanCart();
                    router.push('/borrowing');
                });
        
        

    }

    return ( 
        <div className="container container-fluid shadow-sm p-4" style={{maxWidth: "800px"}}>
            
            <div className="d-flex justify-content-between align-items-center">
             <h4 className="card-title mb-4 text-dark">
                {(!targetMember.hasOwnProperty('firstName')) ?
                "Select a member" : targetMember.firstName + " " + targetMember.lastName + "'s Cart"}
            </h4> 
             <SearchMember updateTargetMember={updateTargetMember}/>
            </div>

            
            <div className="table-responsive p-4">
                <table className="table table-hover table-borderless align-middle">
                    <thead className="table-light py-3">
                        <tr>
                            <th>Items</th>
                            <th>Cost</th>
                        </tr>
                        </thead>
                    {items.map(item => (
                        <tbody className="table-group-divider" key={Math.random()}>
                            <tr>
                                <td>{item.bookTitle} ({item.author})</td>
                                <td>
                                    <span className="p-3">$10</span>
                                    <button type="button" onClick={() => removeFromCart(item)} className="btn btn-dark">X</button>
                                </td>
                                
                            </tr>
                        </tbody>
                    ))}
                </table>            
                <div className="p-2 container d-flex">
                    <div>Total: ${ items.length * 10}</div>
                    <div className="ms-auto">
                        <button type="button" 
                        onClick={() => handleCheckout()} 
                        disabled={disableButton}
                        className="btn btn-dark">Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Checkout;