import React, { useState } from "react";
import axios from "axios";

function CreateCommunityGroup() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newGroup = { name, description };
      await axios.post("http://localhost:8080/api/community-groups", newGroup);
      alert("Community Group created successfully!");
      setName("");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("Failed to create Community Group.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Community Group</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Group Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter group name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            placeholder="Enter group description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Group
        </button>
      </form>
    </div>
  );
}

export default CreateCommunityGroup;
