import { useEffect, useState } from "react";
import api from "@/classes/api";

const SearchMember = ({ updateTargetMember }) => {
  const [members, setMembers] = useState([]);
  const [searchTxt, setSearchTxt] = useState(null);

  async function fetchMembers() {
    api
      .get("/members")
      .then((res) => {
        if (!res.ok) throw Error(res.status);
        setMembers(res.data);
      })
      .catch((error) => []);
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleClick = (member) => {
    updateTargetMember(member);
    setSearchTxt("");
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearchTxt(event.target.value.toLowerCase());
  };

  return (
    <div className="form-group p-3">
      <input
        type="text"
        className="form-control rounded-5 shadow-lg"
        placeholder="Select Member"
        style={{ maxWidth: "300px" }}
        onChange={handleChange}
      />

      <div className="dropdown overflow-auto small p-2">
        {members
          .filter(
            (m) =>
              searchTxt &&
              (m.firstName + m.lastName).toLowerCase().includes(searchTxt)
          )
          .map((member) => (
            <button
              className="dropdown-item"
              key={member.id}
              onClick={() => handleClick(member)}
            >
              {member.firstName + " " + member.lastName}
              <span style={{ color: "grey" }}> ({member.id}) </span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default SearchMember;
