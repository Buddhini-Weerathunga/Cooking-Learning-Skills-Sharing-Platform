import React, { useState, useEffect } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GroupMembers = ({ groupId }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, [groupId]);

  const fetchMembers = async () => {
    try {
      // TODO: Implement API call
      const response = await fetch(`/api/groups/${groupId}/members`);
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  return (
    <div>
      <h3>Members</h3>
      <ListGroup>
        {members.map((member) => (
          <ListGroup.Item 
            key={member.id}
            className="d-flex justify-content-between align-items-center"
          >
            <Link 
              to={`/profile/${member.id}`} 
              className="d-flex align-items-center text-decoration-none text-dark"
            >
              <img 
                src={member.avatar} 
                alt={member.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
              />
              {member.name}
            </Link>
            <div>
              {member.role === 'admin' && (
                <span className="badge bg-primary">Admin</span>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default GroupMembers; 