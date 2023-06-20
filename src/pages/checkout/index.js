import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import CartContext from "../../components/cart/cartcontext";
import SearchMember from "../../components/member/search";
import api from "@/classes/api";

const Checkout = () => {
  const { items, removeFromCart, cleanCart } = useContext(CartContext);
  const [targetMember, setTargetMember] = useState({});
  const actionMsg = useRef(null);

  let itemCount = 0;

  const [disableButton, setDisableButton] = useState("true");
  const router = useRouter();

  const updateTargetMember = (member) => {
    setTargetMember(member);
  };

  useEffect(() => {
    if (items.length > 0 && targetMember.hasOwnProperty("firstName")) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [items, targetMember]);

  const handleCheckout = async () => {
    if (targetMember.balance < items.length * 10) {
      actionMsg.current.className = "alert alert-danger";
      actionMsg.current.innerText =
        "Failed! " + targetMember.firstName + " doesn't have enough credit";
      return;
    }
    const borrowedBooks = items.map((item) => item.bookId);

    const data = {
      borrowedBooks: [...borrowedBooks],
      borrower: targetMember.id,
      cost: items.length * 10,
    };

    api.post("/borrowings", data)
      .then((res) => {
        if (res.ok) {
          cleanCart();
          router.push("/borrowing");
        } else {
          throw Error(res.status);
        }
      })
      .catch((error) => {
        actionMsg.current.className = "alert alert-danger";
        actionMsg.current.innerText = "Something went wrong: " + error.message;
      });
  };

  return (
    <div
      className="container container-fluid shadow-sm p-4"
      style={{ maxWidth: "800px" }}
    >
      <div ref={actionMsg} className="" role="alart"></div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="card-title mb-4 text-dark">
          {!targetMember.hasOwnProperty("firstName")
            ? "Select a member"
            : targetMember.firstName + " " + targetMember.lastName + "'s Cart"}
        </h4>
        <SearchMember updateTargetMember={updateTargetMember} />
      </div>

      <div className="table-responsive p-4">
        <table className="table table-hover table-borderless align-middle">
          <thead className="table-light py-3">
            <tr>
              <th>Items</th>
              <th>Cost</th>
            </tr>
          </thead>
          {items.map((item) => (
            <tbody className="table-group-divider">
              <tr key={itemCount++}>
                <td>
                  {item.bookTitle} ({item.author})
                </td>
                <td>
                  <span className="p-3">$10</span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item)}
                    className="btn btn-dark"
                  >
                    X
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div className="p-2 container d-flex">
          <div>Total: ${items.length * 10}</div>
          <div className="ms-auto">
            <button
              type="button"
              onClick={() => handleCheckout()}
              disabled={disableButton}
              className="btn btn-dark"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
