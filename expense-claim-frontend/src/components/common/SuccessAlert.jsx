import React from 'react';
import { Alert } from 'react-bootstrap';

const SuccessAlert = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <Alert variant="success" className="mb-3" onClose={onDismiss} dismissible>
      <Alert.Heading>Success!</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
};

export default SuccessAlert;