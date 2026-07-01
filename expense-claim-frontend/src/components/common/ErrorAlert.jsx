import React from 'react';
import { Alert, Button } from 'react-bootstrap';

const ErrorAlert = ({ error, onDismiss }) => {
  if (!error) return null;

  let errorMessage = 'An error occurred. Please try again.';
  
  if (typeof error === 'string') {
    errorMessage = error;
  } else if (error.message) {
    errorMessage = error.message;
  } else if (error.response?.data?.message) {
    errorMessage = error.response.data.message;
  }

  return (
    <Alert variant="danger" className="mb-3" onClose={onDismiss} dismissible>
      <Alert.Heading>Error!</Alert.Heading>
      <p>{errorMessage}</p>
      {error.response?.data?.errors && (
        <ul className="mb-0">
          {Object.entries(error.response.data.errors).map(([field, message]) => (
            <li key={field}>
              <strong>{field}:</strong> {message}
            </li>
          ))}
        </ul>
      )}
    </Alert>
  );
};

export default ErrorAlert;