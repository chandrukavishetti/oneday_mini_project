import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <small>
              © {new Date().getFullYear()} Expense Claim Management System. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;