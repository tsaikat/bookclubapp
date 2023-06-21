import { useEffect, useRef, useState } from "react";
import BorrowingList from "../../components/borrowing/borrowinglist";
import { useSession } from "next-auth/react";
import api from "@/classes/api";

const Borrowings = () => {
  const [borrowings, setBorrowings] = useState([]);
  const borrowingBlock = useRef("");
  const { data: session } = useSession();
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    api
      .get("/borrowings")
      .then((res) => {
        if (!res) throw Error(res.status);
        setBorrowings(res.data);
      })
      .catch((error) => {
        borrowingBlock.current.className = "alert alert-danger text-center";
        borrowingBlock.current.innerText =
          "Failed to render borrowing list: " + error.message;
      });
  }, [toggle]);

  return (
    <div className="container mt-5">
      <div ref={borrowingBlock}>
        <BorrowingList
          borrowings={borrowings}
          toggle={toggle}
          setToggle={setToggle}
        />
      </div>
    </div>
  );
};

export default Borrowings;
