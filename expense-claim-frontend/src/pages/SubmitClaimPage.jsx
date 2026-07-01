import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ClaimForm } from '../components/claims';
import { PageHeader } from '../components/common';
import { submitClaim } from '../api/claimAPI';

const SubmitClaimPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (claimData) => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');
    
    try {
      const response = await submitClaim(claimData);
      setSuccessMessage(`Claim submitted successfully! Claim ID: ${response.id}`);
      // Reset form is handled by ClaimForm component's reset
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to submit claim';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <PageHeader 
        title="Submit Expense Claim"
        subtitle="Fill in the details below to submit a new expense claim"
        breadcrumbs={[{ label: 'Submit Claim' }]}
      />
      
      <Row>
        <Col lg={8} className="mx-auto">
          <ClaimForm 
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
            successMessage={successMessage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SubmitClaimPage;