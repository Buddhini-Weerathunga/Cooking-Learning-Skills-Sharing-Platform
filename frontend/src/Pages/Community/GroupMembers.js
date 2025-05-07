import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, ListGroup, Badge, Button } from 'react-bootstrap';
import { mockMembers } from './mockData';

const GroupMembers = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Simulate API call with mock data
    const groupMembers = mockMembers.filter(m => m.groupId === groupId);
    setMembers(groupMembers);
  }, [groupId]);

  return (
    <div style={{ marginTop: "120px" }}>
      <Container>
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate(`/community/groups/${groupId}`)}
          className="mb-3"
        >
          ← Back to Group
        </Button>

        <h2 className="mb-4">Members</h2>
        <ListGroup>
          {members.map(member => (
            <ListGroup.Item 
              key={member.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                />
                {member.name}
              </div>
              {member.role === 'admin' && (
                <Badge bg="primary">Admin</Badge>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default GroupMembers; 