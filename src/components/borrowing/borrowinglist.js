import { useRef } from "react";
import api from "@/classes/api";

const BorrowingList = ({ borrowings, toggle, setToggle }) => {
  const actionMsg = useRef(null);

  const handleDeleteButton = (borrowing) => {
    api
      .delete("/borrowings/" + borrowing.borrowingId)
      .then(() => {
        setToggle(!toggle);
        actionMsg.current.className = "alert alert-success";
        actionMsg.current.innerText =
          "Borrowing ID: " +
          borrowing.borrowingId +
          " was deleted successfully";
      })
      .catch(() => {
        actionMsg.current.className = "alert alert-danger";
        actionMsg.current.innerText = "Failed to delete! Try again";
      });

    if (actionMsg.current) {
      setTimeout(() => {
        actionMsg.current.className = "";
        actionMsg.current.innerText = "";
      }, 5000);
    }
  };

  const handleReturnButton = (borrowing) => {
    api
      .put("/borrowings/" + borrowing.borrowingId, borrowing)
      .then((res) => {
        if (!res.ok) throw Error(res.status);
        setToggle(!toggle);
        actionMsg.current.className = "alert alert-success";
        actionMsg.current.innerText =
          "Borrowing Ref no: " + borrowing.borrowingId + " returned";
      })
      .catch(() => {
        actionMsg.current.className = "alert alert-danger";
        actionMsg.current.innerText = "Failed to return, try again";
      });
  };

  return (
    <>
      <div ref={actionMsg} className="" role="alart"></div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="card-title mb-4 text-uppercase text-dark">
          List of Borrowings
        </h3>
      </div>
      <table className="table table-hover tab container shadow-lg rounded-top p-lg-5">
        <thead className="bg-dark-subtle rounded-top">
          <tr>
            <th>Ref No</th>
            <th>Borrower</th>
            <th>Borrowing Date</th>
            <th>No of Books</th>
            <th>Cost</th>
            <th>Returned</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {borrowings.map((b) => (
            <tr key={b.borrowingId}>
              <td>{b.borrowingId}</td>
              <td>{b.borrowerName}</td>
              <td>{b.borrowDate.slice(0, 10)}</td>
              <td>{b.borrowedBooks.length}</td>
              <td>{b.cost}</td>
              <td>
                {" "}
                {b.returnDate ? (
                  b.returnDate.slice(0, 10)
                ) : (
                  <button
                    onClick={() => handleReturnButton(b)}
                    className="btn btn-outline-dark"
                    role="button"
                  >
                    {" "}
                    Return
                  </button>
                )}
              </td>
              <td>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => handleDeleteButton(b)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BorrowingList;
