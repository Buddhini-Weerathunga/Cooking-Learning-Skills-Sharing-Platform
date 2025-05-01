import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CommunityHome = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // TODO: Fetch groups from API
  }, []);

  return (
    <div style={{ marginTop: "120px" }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h1>Community Groups</h1>
              <Link to="/community/groups/create" className="btn btn-primary">
                Create New Group
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          {groups.map(group => (
            <Col key={group.id} md={4} className="mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{group.name}</h5>
                  <p className="card-text">{group.description}</p>
                  <Link to={`/community/groups/${group.id}`} className="btn btn-primary">
                    View Group
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CommunityHome; 