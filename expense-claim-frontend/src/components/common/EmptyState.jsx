import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const EmptyState = ({ title = 'No data found', message = 'There are no records to display.', icon = '📭' }) => {
  return (
    <Container className="text-center my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div style={{ fontSize: '4rem' }} className="mb-3">
            {icon}
          </div>
          <h4>{title}</h4>
          <p className="text-muted">{message}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default EmptyState;