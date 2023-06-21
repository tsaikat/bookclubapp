import { useEffect, useState, useRef } from "react";
import MemberList from "../../components/member/memberlist";
import AddMember from "../../components/member/add";
import api from "@/classes/api";

const Members = () => {
  const [members, setMembers] = useState([]);

  const memberListBlock = useRef("");
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    api.get("/members")
      .then((res) => {
        if (!res.ok) throw Error(res.status);
        setMembers(res.data);
      })
      .catch((error) => {
        memberListBlock.current.className = "alert alert-danger text-center";
        memberListBlock.current.innerText = "Server error: " + error.message;
      });
  }, [toggle]);

  return (
    <div className="container mt-5">
      <AddMember toggle={toggle} setToggle={setToggle} />
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="card-title mb-4 text-uppercase text-dark">
          List of Members
        </h3>
      </div>
      <div ref={memberListBlock}>
        <MemberList members={members} toggle={toggle} setToggle={setToggle} />
      </div>
    </div>
  );
};

export default Members;
