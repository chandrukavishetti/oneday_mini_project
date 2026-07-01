import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { DEPARTMENTS, EXPENSE_CATEGORIES, CLAIM_STATUSES } from '../../utils/constants';

const ClaimFilters = ({ onFilterChange, filters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value
    });
  };

  const handleReset = () => {
    onFilterChange({
      department: '',
      monthYear: '',
      status: '',
      category: ''
    });
  };

  return (
    <div className="bg-light p-3 rounded mb-3">
      <Row>
        <Col md={3}>
          <Form.Group className="mb-2 mb-md-0">
            <Form.Label className="small mb-1">Department</Form.Label>
            <Form.Select
              name="department"
              value={filters.department || ''}
              onChange={handleChange}
              size="sm"
            >
              <option value="">All Departments</option>
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group className="mb-2 mb-md-0">
            <Form.Label className="small mb-1">Month-Year</Form.Label>
            <Form.Control
              type="month"
              name="monthYear"
              value={filters.monthYear || ''}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group className="mb-2 mb-md-0">
            <Form.Label className="small mb-1">Status</Form.Label>
            <Form.Select
              name="status"
              value={filters.status || ''}
              onChange={handleChange}
              size="sm"
            >
              <option value="">All Status</option>
              {CLAIM_STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group className="mb-2 mb-md-0">
            <Form.Label className="small mb-1">Category</Form.Label>
            <Form.Select
              name="category"
              value={filters.category || ''}
              onChange={handleChange}
              size="sm"
            >
              <option value="">All Categories</option>
              {EXPENSE_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2} className="d-flex align-items-end">
          <Button 
            variant="outline-secondary" 
            size="sm" 
            onClick={handleReset}
            className="w-100"
          >
            Clear Filters
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ClaimFilters;