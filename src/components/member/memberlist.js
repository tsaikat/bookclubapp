import Link from "next/link";
import { useRef } from "react";
import api from "@/classes/api";

const MemberList = ({ members, toggle, setToggle }) => {
  const actionMsg = useRef(null);

  const handleDeleteButton = (member) => {
    api
      .delete("/members/" + member.id)
      .then(() => {
        setToggle(!toggle);
        actionMsg.current.className = "alert alert-success";
        actionMsg.current.innerText =
          member.firstName +
          " " +
          member.lastName +
          " was removed successfully";
      })
      .catch(() => {
        actionMsg.current.className = "alert alert-danger";
        actionMsg.current.innerText =
          member.firstName +
          " " +
          member.lastName +
          " failed to remove! Try again.";
      });

    if (actionMsg.current) {
      setTimeout(() => {
        actionMsg.current.className = "";
        actionMsg.current.innerText = "";
      }, 5000);
    }
  };

  return (
    <>
      <div ref={actionMsg} className="" role="alart"></div>
      <table className="table table-hover tab container shadow-lg rounded-top p-lg-5">
        <thead className="bg-dark-subtle rounded-top">
          <tr>
            <th>Name</th>
            <th>Joined</th>
            <th>Balance</th>
            <th>Total Borrowings</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>{m.firstName + " " + m.lastName}</td>
              <td>{m.joinDate.slice(0, 10)}</td>
              <td>{m.balance}</td>
              <td>{m.borrowings.length}</td>
              <td>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => handleDeleteButton(m)}
                >
                  Remove
                </button>
              </td>
              <td>
                <Link
                  href={"/member/balance/" + m.id}
                  className="btn btn-outline-dark"
                  role="button"
                >
                  {" "}
                  Add balance
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MemberList;
