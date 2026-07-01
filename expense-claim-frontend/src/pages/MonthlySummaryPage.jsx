import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { PageHeader, EmptyState } from '../components/common';
import { DEPARTMENTS } from '../utils/constants';
import { formatCurrency } from '../utils/formatters';
import { getMonthlySummary } from '../api/claimAPI';

const MonthlySummaryPage = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    department: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSummaryData(null);

    try {
      const response = await getMonthlySummary({
        department: formData.department,
        month: parseInt(formData.month),
        year: parseInt(formData.year)
      });
      setSummaryData(response);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch summary';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
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
    <Container>
      <PageHeader 
        title="Monthly Finance Summary"
        subtitle="View financial summary by department and month"
        breadcrumbs={[{ label: 'Summary' }]}
      />

      <Row className="mb-4">
        <Col lg={8} className="mx-auto">
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Department *</Form.Label>
                      <Form.Select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Department</option>
                        {DEPARTMENTS.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Month *</Form.Label>
                      <Form.Select
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        required
                      >
                        {months.map(month => (
                          <option key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Year *</Form.Label>
                      <Form.Select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                      >
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="text-center">
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? 'Loading...' : 'View Summary'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading summary...</p>
        </div>
      )}

      {error && (
        <Row>
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      {summaryData && (
        <Row>
          <Col>
            <Card className="shadow-sm">
              <Card.Header>
                <h5 className="mb-0">
                  {summaryData.department} - {months.find(m => m.value === summaryData.month)?.label} {summaryData.year}
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6} lg={4} className="mb-3">
                    <div className="bg-light p-3 rounded text-center">
                      <h6 className="text-muted">Monthly Budget</h6>
                      <h4 className="text-primary">{formatCurrency(summaryData.monthlyBudget)}</h4>
                    </div>
                  </Col>

                  <Col md={6} lg={4} className="mb-3">
                    <div className="bg-light p-3 rounded text-center">
                      <h6 className="text-muted">Total Approved</h6>
                      <h4 className="text-success">{formatCurrency(summaryData.totalApprovedExpense)}</h4>
                    </div>
                  </Col>

                  <Col md={6} lg={4} className="mb-3">
                    <div className="bg-light p-3 rounded text-center">
                      <h6 className="text-muted">Total Pending</h6>
                      <h4 className="text-warning">{formatCurrency(summaryData.totalPendingExpense)}</h4>
                    </div>
                  </Col>

                  <Col md={6} lg={4} className="mb-3">
                    <div className="bg-light p-3 rounded text-center">
                      <h6 className="text-muted">Remaining Budget</h6>
                      <h4 className={summaryData.remainingBudget < 0 ? 'text-danger' : 'text-info'}>
                        {formatCurrency(summaryData.remainingBudget)}
                      </h4>
                    </div>
                  </Col>

                  <Col md={6} lg={4} className="mb-3">
                    <div className="bg-light p-3 rounded text-center">
                      <h6 className="text-muted">Pending Claims</h6>
                      <h4 className="text-warning">{summaryData.pendingCount}</h4>
                    </div>
                  </Col>

                  <Col md={6} lg={4} className="mb-3">
                    <div className="bg-light p-3 rounded text-center">
                      <h6 className="text-muted">Approved Claims</h6>
                      <h4 className="text-success">{summaryData.approvedCount}</h4>
                    </div>
                  </Col>

                  <Col md={6} lg={4} className="mb-3">
                    <div className="bg-light p-3 rounded text-center">
                      <h6 className="text-muted">Rejected Claims</h6>
                      <h4 className="text-danger">{summaryData.rejectedCount}</h4>
                    </div>
                  </Col>

                  <Col md={6} lg={4} className="mb-3">
                    <div className="bg-light p-3 rounded text-center">
                      <h6 className="text-muted">Total Claims</h6>
                      <h4 className="text-dark">
                        {summaryData.pendingCount + summaryData.approvedCount + summaryData.rejectedCount}
                      </h4>
                    </div>
                  </Col>
                </Row>

                <div className="mt-3 p-3 bg-light rounded">
                  <h6>Summary Information</h6>
                  <ul className="mb-0">
                    <li>
                      <strong>Budget Usage:</strong>{' '}
                      {summaryData.monthlyBudget > 0 
                        ? `${((summaryData.totalApprovedExpense / summaryData.monthlyBudget) * 100).toFixed(1)}%`
                        : '0%'
                      }
                    </li>
                    <li>
                      <strong>Status:</strong>{' '}
                      {summaryData.remainingBudget >= 0 
                        ? <span className="text-success">Within Budget</span>
                        : <span className="text-danger">Over Budget</span>
                      }
                    </li>
                    <li>
                      <strong>Approval Rate:</strong>{' '}
                      {summaryData.approvedCount + summaryData.rejectedCount > 0
                        ? `${((summaryData.approvedCount / (summaryData.approvedCount + summaryData.rejectedCount)) * 100).toFixed(1)}%`
                        : '0%'
                      }
                    </li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {!summaryData && !loading && !error && (
        <EmptyState 
          title="No Summary Data"
          message="Select a department, month, and year to view the financial summary"
          icon="📊"
        />
      )}
    </Container>
  );
};

export default MonthlySummaryPage;