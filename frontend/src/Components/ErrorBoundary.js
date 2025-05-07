import React from 'react';
import { Container, Button } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container style={{ marginTop: "120px" }}>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.message}</p>
          <Button 
            variant="primary" 
            onClick={() => window.location.href = '/community'}
          >
            Return to Community Home
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 