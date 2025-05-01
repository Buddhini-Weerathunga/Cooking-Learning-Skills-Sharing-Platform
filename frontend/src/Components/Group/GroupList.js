import React from "react";
import GroupCard from "./GroupCard";
const GroupList = ({ groups }) => (
  <div className="d-flex flex-wrap">
    {groups.map((group) => (
      <GroupCard key={group._id} group={group} />
    ))}
  </div>
);
export default GroupList;