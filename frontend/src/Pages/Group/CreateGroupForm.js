import React, { useState } from 'react';
import axios from 'axios';

const CreateGroupForm = () => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [groupRules, setGroupRules] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const groupData = {
      name: groupName,
      description: description,
      category: category,
      groupRules: groupRules,
      isPrivate: isPrivate,
    };

    try {
      // The username can be dynamically set based on the logged-in user
      const username = 'creatorUsername'; // Change to dynamic username based on authentication

      const response = await axios.post('http://localhost:8080/api/groups/create', groupData, {
        params: { username: username },
      });
      console.log('Group created:', response.data);
      alert('Group created successfully!');
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Error creating the group!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Group Name:</label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Group Rules:</label>
        <textarea
          value={groupRules}
          onChange={(e) => setGroupRules(e.target.value)}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
          Private Group
        </label>
      </div>
      <button type="submit">Create Group</button>
    </form>
  );
};

export default CreateGroupForm;
