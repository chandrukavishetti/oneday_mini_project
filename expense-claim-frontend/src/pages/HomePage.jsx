import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="display-4">Expense Claim Management System</h1>
          <p className="lead text-muted">
            Manage employee expense claims and department budgets efficiently
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={6} lg={4} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <div style={{ fontSize: '3rem' }}>📝</div>
              <Card.Title>Submit Claim</Card.Title>
              <Card.Text>
                Submit a new expense claim for approval
              </Card.Text>
              <Button as={Link} to="/submit-claim" variant="primary">
                Submit Now
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <div style={{ fontSize: '3rem' }}>📋</div>
              <Card.Title>View Claims</Card.Title>
              <Card.Text>
                View and filter all submitted claims
              </Card.Text>
              <Button as={Link} to="/claims" variant="primary">
                View Claims
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <div style={{ fontSize: '3rem' }}>✅</div>
              <Card.Title>Review Claims</Card.Title>
              <Card.Text>
                Approve or reject pending claims
              </Card.Text>
              <Button as={Link} to="/review" variant="primary">
                Review Now
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <div style={{ fontSize: '3rem' }}>💰</div>
              <Card.Title>Manage Budgets</Card.Title>
              <Card.Text>
                Create and manage department budgets
              </Card.Text>
              <Button as={Link} to="/budgets" variant="primary">
                Manage Budgets
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <div style={{ fontSize: '3rem' }}>📊</div>
              <Card.Title>Monthly Summary</Card.Title>
              <Card.Text>
                View financial summary by department
              </Card.Text>
              <Button as={Link} to="/summary" variant="primary">
                View Summary
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;