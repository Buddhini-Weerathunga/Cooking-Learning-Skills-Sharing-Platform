import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const GroupList = ({ groups }) => {
  const navigate = useNavigate();

  const handleGroupClick = (groupId) => {
    navigate(`/community/groups/${groupId}`);
  };

  return (
    <Row>
      {groups.map((group) => (
        <Col key={group.id} md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>{group.name}</Card.Title>
              <Card.Text>{group.description}</Card.Text>
              <Card.Text>
                <small className="text-muted">
                  Members: {group.memberCount}
                </small>
              </Card.Text>
              <button 
                className="btn btn-primary"
                onClick={() => handleGroupClick(group.id)}
              >
                View Group
              </button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default GroupList; 