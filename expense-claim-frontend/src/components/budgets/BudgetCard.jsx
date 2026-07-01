import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatters';

const BudgetCard = ({ budget, onEdit, onDelete, showActions = true }) => {
  const getMonthName = (month) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1];
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="mb-0">{budget.department}</h5>
          <span className="badge bg-primary">
            {getMonthName(budget.month)} {budget.year}
          </span>
        </div>

        <div className="text-center my-3">
          <h3 className="text-success">{formatCurrency(budget.budgetAmount)}</h3>
          <small className="text-muted">Monthly Budget</small>
        </div>

        <div className="d-flex justify-content-between small text-muted">
          <span>Month: {budget.month}</span>
          <span>Year: {budget.year}</span>
        </div>

        {showActions && (
          <div className="d-flex gap-2 mt-3">
            <Button 
              variant="outline-primary" 
              size="sm" 
              onClick={onEdit}
              className="flex-grow-1"
            >
              Edit
            </Button>
            <Button 
              variant="outline-danger" 
              size="sm" 
              onClick={onDelete}
              className="flex-grow-1"
            >
              Delete
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;