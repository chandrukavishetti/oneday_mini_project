import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BudgetForm, BudgetList, BudgetSearch } from '../components/budgets';
import { PageHeader } from '../components/common';
import { createBudget, updateBudget, deleteBudget, getAllBudgets } from '../api/budgetAPI';

const BudgetManagementPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [searchFilters, setSearchFilters] = useState(null);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await getAllBudgets();
      let filteredBudgets = response || [];
      
      // Apply search filters if any
      if (searchFilters) {
        filteredBudgets = filteredBudgets.filter(budget => {
          let match = true;
          if (searchFilters.department && budget.department !== searchFilters.department) {
            match = false;
          }
          if (searchFilters.month && budget.month !== parseInt(searchFilters.month)) {
            match = false;
          }
          if (searchFilters.year && budget.year !== parseInt(searchFilters.year)) {
            match = false;
          }
          return match;
        });
      }
      
      setBudgets(filteredBudgets);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch budgets');
      setBudgets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBudget = async (budgetData) => {
    setError('');
    setSuccessMessage('');
    
    try {
      await createBudget(budgetData);
      setSuccessMessage('Budget created successfully!');
      setShowForm(false);
      await fetchBudgets();
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to create budget';
      setError(errorMsg);
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleUpdateBudget = async (budgetData) => {
    setError('');
    setSuccessMessage('');
    
    try {
      await updateBudget(editingBudget.id, budgetData);
      setSuccessMessage('Budget updated successfully!');
      setEditingBudget(null);
      setShowForm(false);
      await fetchBudgets();
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to update budget';
      setError(errorMsg);
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleDeleteBudget = async (id) => {
    setError('');
    setSuccessMessage('');
    
    try {
      await deleteBudget(id);
      setSuccessMessage('Budget deleted successfully!');
      await fetchBudgets();
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to delete budget';
      setError(errorMsg);
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleEditClick = (budget) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingBudget(null);
    setError('');
    setSuccessMessage('');
  };

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    fetchBudgets();
  };

  return (
    <Container>
      <PageHeader 
        title="Budget Management"
        subtitle="Create and manage department budgets"
        breadcrumbs={[{ label: 'Budgets' }]}
      />

      {!showForm && (
        <div className="mb-3">
          <Button 
            variant="primary" 
            onClick={() => setShowForm(true)}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Create New Budget
          </Button>
        </div>
      )}

      {showForm && (
        <Row className="mb-4">
          <Col lg={8} className="mx-auto">
            <BudgetForm
              onSubmit={editingBudget ? handleUpdateBudget : handleCreateBudget}
              isLoading={loading}
              error={error}
              successMessage={successMessage}
              initialData={editingBudget}
              isEdit={!!editingBudget}
            />
            <div className="mt-2">
              <Button 
                variant="outline-secondary" 
                size="sm" 
                onClick={handleCancelForm}
              >
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      )}

      <BudgetSearch onSearch={handleSearch} isLoading={loading} />

      <BudgetList 
        budgets={budgets}
        loading={loading}
        error={error}
        onDelete={handleDeleteBudget}
        onEdit={handleEditClick}
        showActions={true}
      />
    </Container>
  );
};

export default BudgetManagementPage;