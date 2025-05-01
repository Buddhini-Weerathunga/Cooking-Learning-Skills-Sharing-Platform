import React, { useEffect, useState } from "react";
import axios from "axios";

function ListCommunityGroups() {
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/community-groups");
      setGroups(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch community groups.");
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="container mt-5">
      <h2>All Community Groups</h2>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td>{group.name}</td>
              <td>{group.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListCommunityGroups;
