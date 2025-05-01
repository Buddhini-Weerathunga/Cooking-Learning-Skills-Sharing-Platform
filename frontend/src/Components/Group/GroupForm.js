import React, { useState } from "react";
const GroupForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name, description });
      }}
    >
      <input
        className="form-control mb-2"
        placeholder="Group Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="btn btn-success">Create Group</button>
    </form>
  );
};
export default GroupForm;
