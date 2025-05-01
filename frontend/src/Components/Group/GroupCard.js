import React from "react";
const GroupCard = ({ group }) => (
  <div className="card m-2 p-2">
    <h5>{group.name}</h5>
    <p>{group.description}</p>
    <button className="btn btn-primary">Join Group</button>
  </div>
);
export default GroupCard;