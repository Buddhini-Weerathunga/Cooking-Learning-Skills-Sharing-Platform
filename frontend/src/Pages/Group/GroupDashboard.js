import React, { useEffect, useState } from "react";
import GroupList from "../components/Group/GroupList";
import GroupForm from "../components/Group/GroupForm";
import axios from "axios";

const GroupDashboard = () => {
  const [groups, setGroups] = useState([]);
  const fetchGroups = async () => {
    const res = await axios.get("/api/groups");
    setGroups(res.data);
  };
  const createGroup = async (group) => {
    await axios.post("/api/groups", group);
    fetchGroups();
  };
  useEffect(() => {
    fetchGroups();
  }, []);
  return (
    <div className="container">
      <h3 className="mt-4">Create a New Group</h3>
      <GroupForm onSubmit={createGroup} />
      <h3 className="mt-4">All Groups</h3>
      <GroupList groups={groups} />
    </div>
  );
};
export default GroupDashboard;