import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [groupRules, setGroupRules] = useState("");
  const [privateGroup, setPrivateGroup] = useState(false);
  const [groupId, setGroupId] = useState(null); // For Update: store the group ID
  const [groupData, setGroupData] = useState(null); // For displaying the group data after creation or update

  // Handle the form submission (for Create and Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const groupData = {
      name: name,
      description: description,
      category: category,
      groupRules: groupRules,
      privateGroup: privateGroup,
    };

    let url = "http://localhost:8080/api/groups/create?username=johndoe"; // Default Create URL
    let method = "POST"; // Default method for Create

    // If there's a groupId, it's an update request
    if (groupId) {
      url = `http://localhost:8080/api/groups/update/${groupId}`;
      method = "PUT";
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groupData),
      });

      const data = await response.json();
      if (response.ok) {
        setGroupData(data); // Store the response data
        console.log(groupId ? "Group updated:" : "Group created:", data);
      } else {
        console.log("Error:", data); // Handle error
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle form reset after successful submission
  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setGroupRules("");
    setPrivateGroup(false);
    setGroupId(null); // Reset groupId after a successful update
  };

  // Handle Update functionality (if needed)
  const handleUpdate = async (e) => {
    e.preventDefault();

    const groupData = {
      name: name,
      description: description,
      category: category,
      groupRules: groupRules,
      privateGroup: privateGroup,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/groups/update/${groupId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groupData),
      });

      const data = await response.json();
      if (response.ok) {
        setGroupData(data); // Store the updated group data
        console.log("Group updated:", data); // Success!
      } else {
        console.log("Error updating group:", data); // Handle error
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h2>{groupId ? "Update Group" : "Create a New Group"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Group Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Group Rules</label>
          <textarea
            className="form-control"
            value={groupRules}
            onChange={(e) => setGroupRules(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Private Group</label>
          <input
            type="checkbox"
            className="form-check-input"
            checked={privateGroup}
            onChange={() => setPrivateGroup(!privateGroup)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {groupId ? "Update Group" : "Create Group"}
        </button>
      </form>

      {groupData && (
        <div>
          <h3>{groupId ? "Updated" : "Created"} Group Details</h3>
          <p>Group Name: {groupData.name}</p>
          <p>Category: {groupData.category}</p>
          <p>Description: {groupData.description}</p>
          <p>Group Rules: {groupData.groupRules}</p>
          <p>Private: {groupData.privateGroup ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
