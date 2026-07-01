import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          <i className="bi bi-wallet2 me-2"></i>
          Expense Claim System
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/submit-claim" active={location.pathname === '/submit-claim'}>
              Submit Claim
            </Nav.Link>
            <Nav.Link as={Link} to="/claims" active={location.pathname === '/claims'}>
              View Claims
            </Nav.Link>
            <Nav.Link as={Link} to="/review" active={location.pathname === '/review'}>
              Review Claims
            </Nav.Link>
            <Nav.Link as={Link} to="/budgets" active={location.pathname === '/budgets'}>
              Manage Budgets
            </Nav.Link>
            <Nav.Link as={Link} to="/summary" active={location.pathname === '/summary'}>
              Summary
            </Nav.Link>
          </Nav>
          <div className="d-flex">
            <Button variant="outline-light" size="sm" disabled>
              <i className="bi bi-person-circle me-1"></i>
              Employee
            </Button>
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;