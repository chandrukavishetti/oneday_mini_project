import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { DEPARTMENTS } from '../../utils/constants';

const BudgetSearch = ({ onSearch, isLoading }) => {
  const [searchData, setSearchData] = useState({
    department: '',
    month: '',
    year: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchData.department || searchData.month || searchData.year) {
      onSearch(searchData);
    }
  };

  const handleReset = () => {
    setSearchData({
      department: '',
      month: '',
      year: ''
    });
    onSearch(null);
  };

  const months = [
    { value: '', label: 'All Months' },
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
  const years = [
    { value: '', label: 'All Years' },
    ...Array.from({ length: 10 }, (_, i) => ({
      value: currentYear - 5 + i,
      label: (currentYear - 5 + i).toString()
    }))
  ];

  return (
    <div className="bg-light p-3 rounded mb-3">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-2 mb-md-0">
              <Form.Label className="small mb-1">Department</Form.Label>
              <Form.Select
                name="department"
                value={searchData.department}
                onChange={handleChange}
                size="sm"
                disabled={isLoading}
              >
                <option value="">All Departments</option>
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group className="mb-2 mb-md-0">
              <Form.Label className="small mb-1">Month</Form.Label>
              <Form.Select
                name="month"
                value={searchData.month}
                onChange={handleChange}
                size="sm"
                disabled={isLoading}
              >
                {months.map(month => (
                  <option key={month.value || 'all'} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group className="mb-2 mb-md-0">
              <Form.Label className="small mb-1">Year</Form.Label>
              <Form.Select
                name="year"
                value={searchData.year}
                onChange={handleChange}
                size="sm"
                disabled={isLoading}
              >
                {years.map(year => (
                  <option key={year.value || 'all'} value={year.value}>
                    {year.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2} className="d-flex align-items-end">
            <div className="d-flex gap-2 w-100">
              <Button 
                type="submit" 
                variant="primary" 
                size="sm"
                disabled={isLoading}
                className="flex-grow-1"
              >
                Search
              </Button>
              <Button 
                type="button" 
                variant="outline-secondary" 
                size="sm"
                onClick={handleReset}
                disabled={isLoading}
                className="flex-grow-1"
              >
                Reset
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default BudgetSearch;