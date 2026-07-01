import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <Container className="text-center my-5">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">{message}</span>
      </Spinner>
      <p className="mt-2 text-muted">{message}</p>
    </Container>
  );
};

export default LoadingSpinner;