import React, { useState } from 'react';
import { Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import BudgetCard from './BudgetCard';
import EmptyState from '../common/EmptyState';
import ConfirmModal from '../common/ConfirmModal';

const BudgetList = ({ 
  budgets, 
  loading, 
  error, 
  onDelete,
  onEdit,
  showActions = true 
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading budgets...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!budgets || budgets.length === 0) {
    return (
      <EmptyState 
        title="No Budgets Found"
        message="No department budgets have been created yet. Create a new budget to get started."
        icon="💰"
      />
    );
  }

  const handleDeleteClick = (budget) => {
    setSelectedBudget(budget);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBudget) {
      onDelete(selectedBudget.id);
      setShowDeleteModal(false);
      setSelectedBudget(null);
    }
  };

  return (
    <>
      <Row className="mb-3">
        <Col>
          <p className="text-muted">
            Showing {budgets.length} budget{budgets.length !== 1 ? 's' : ''}
          </p>
        </Col>
      </Row>

      <Row>
        {budgets.map(budget => (
          <Col key={budget.id} md={6} lg={4} className="mb-3">
            <BudgetCard 
              budget={budget}
              onEdit={() => onEdit(budget)}
              onDelete={() => handleDeleteClick(budget)}
              showActions={showActions}
            />
          </Col>
        ))}
      </Row>

      <ConfirmModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedBudget(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Budget"
        message={`Are you sure you want to delete the budget for ${selectedBudget?.department} for ${selectedBudget?.month}/${selectedBudget?.year}?`}
        confirmText="Delete"
        variant="danger"
      />
    </>
  );
};

export default BudgetList;