import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { DEPARTMENTS, EXPENSE_CATEGORIES } from '../../utils/constants';

const ClaimForm = ({ onSubmit, isLoading, error, successMessage }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    category: '',
    amount: '',
    expenseDate: '',
    description: ''
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.employeeName.trim()) errors.employeeName = 'Employee name is required';
    if (!formData.department) errors.department = 'Department is required';
    if (!formData.category) errors.category = 'Expense category is required';
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      errors.amount = 'Amount must be greater than zero';
    }
    if (!formData.expenseDate) errors.expenseDate = 'Expense date is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (formData.description.length > 500) errors.description = 'Description must not exceed 500 characters';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        amount: parseFloat(formData.amount)
      });
    }
  };

  const handleReset = () => {
    setFormData({
      employeeName: '',
      department: '',
      category: '',
      amount: '',
      expenseDate: '',
      description: ''
    });
    setValidationErrors({});
  };

  return (
    <Card>
      <Card.Header>
        <h4 className="mb-0">Submit New Expense Claim</h4>
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Employee Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                  placeholder="Enter employee name"
                  isInvalid={!!validationErrors.employeeName}
                  disabled={isLoading}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.employeeName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Department *</Form.Label>
                <Form.Select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  isInvalid={!!validationErrors.department}
                  disabled={isLoading}
                >
                  <option value="">Select Department</option>
                  {DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {validationErrors.department}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Expense Category *</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  isInvalid={!!validationErrors.category}
                  disabled={isLoading}
                >
                  <option value="">Select Category</option>
                  {EXPENSE_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {validationErrors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Amount ($) *</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  isInvalid={!!validationErrors.amount}
                  disabled={isLoading}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.amount}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Expense Date *</Form.Label>
                <Form.Control
                  type="date"
                  name="expenseDate"
                  value={formData.expenseDate}
                  onChange={handleChange}
                  isInvalid={!!validationErrors.expenseDate}
                  disabled={isLoading}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.expenseDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter expense description"
                  rows={3}
                  isInvalid={!!validationErrors.description}
                  disabled={isLoading}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.description}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  {formData.description.length}/500 characters
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-2">
            <Button 
              type="submit" 
              variant="primary" 
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Claim'}
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={handleReset}
              disabled={isLoading}
            >
              Reset
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ClaimForm;