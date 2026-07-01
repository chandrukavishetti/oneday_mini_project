import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { DEPARTMENTS } from '../../utils/constants';

const BudgetForm = ({ 
  onSubmit, 
  isLoading, 
  error, 
  successMessage, 
  initialData = null,
  isEdit = false
}) => {
  const [formData, setFormData] = useState({
    department: '',
    month: '',
    year: new Date().getFullYear().toString(),
    budgetAmount: ''
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        department: initialData.department || '',
        month: initialData.month?.toString() || '',
        year: initialData.year?.toString() || new Date().getFullYear().toString(),
        budgetAmount: initialData.budgetAmount?.toString() || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.department) errors.department = 'Department is required';
    if (!formData.month) errors.month = 'Month is required';
    if (!formData.year) errors.year = 'Year is required';
    if (!formData.budgetAmount || parseFloat(formData.budgetAmount) <= 0) {
      errors.budgetAmount = 'Budget amount must be greater than zero';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        department: formData.department,
        month: parseInt(formData.month),
        year: parseInt(formData.year),
        budgetAmount: parseFloat(formData.budgetAmount)
      });
    }
  };

  const handleReset = () => {
    setFormData({
      department: '',
      month: '',
      year: new Date().getFullYear().toString(),
      budgetAmount: ''
    });
    setValidationErrors({});
  };

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  return (
    <Card>
      <Card.Header>
        <h4 className="mb-0">{isEdit ? 'Update Budget' : 'Create New Department Budget'}</h4>
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Department *</Form.Label>
                <Form.Select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  isInvalid={!!validationErrors.department}
                  disabled={isLoading || isEdit}
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

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Month *</Form.Label>
                <Form.Select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  isInvalid={!!validationErrors.month}
                  disabled={isLoading || isEdit}
                >
                  <option value="">Select Month</option>
                  {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {validationErrors.month}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Year *</Form.Label>
                <Form.Select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  isInvalid={!!validationErrors.year}
                  disabled={isLoading || isEdit}
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {validationErrors.year}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Budget Amount ($) *</Form.Label>
                <Form.Control
                  type="number"
                  name="budgetAmount"
                  value={formData.budgetAmount}
                  onChange={handleChange}
                  placeholder="Enter budget amount"
                  step="0.01"
                  min="0.01"
                  isInvalid={!!validationErrors.budgetAmount}
                  disabled={isLoading}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.budgetAmount}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-2">
            <Button 
              type="submit" 
              variant="primary" 
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : isEdit ? 'Update Budget' : 'Create Budget'}
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

export default BudgetForm;