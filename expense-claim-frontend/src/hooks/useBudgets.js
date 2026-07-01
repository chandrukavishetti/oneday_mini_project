import { useState, useEffect, useCallback } from 'react';
import {
  getAllBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
  getBudgetById,
  getBudgetByDepartmentAndMonthYear,
  checkBudgetExists
} from '../api/budgetAPI';

export const useBudgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const fetchBudgets = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await getAllBudgets();
      setBudgets(response || []);
      setTotalCount(response?.length || 0);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch budgets';
      setError(errorMsg);
      setBudgets([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const addBudget = async (budgetData) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await createBudget(budgetData);
      await fetchBudgets();
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to create budget';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editBudget = async (id, budgetData) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await updateBudget(id, budgetData);
      await fetchBudgets();
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to update budget';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeBudget = async (id) => {
    setLoading(true);
    setError('');
    
    try {
      await deleteBudget(id);
      await fetchBudgets();
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to delete budget';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBudget = async (id) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await getBudgetById(id);
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch budget';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBudgetByDeptMonthYear = async (department, month, year) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await getBudgetByDepartmentAndMonthYear({ department, month, year });
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch budget';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const budgetExists = async (department, month, year) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await checkBudgetExists({ department, month, year });
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to check budget existence';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchBudgets = useCallback((filters) => {
    if (!filters || Object.keys(filters).length === 0) {
      fetchBudgets();
      return;
    }

    let filtered = budgets;
    
    if (filters.department) {
      filtered = filtered.filter(b => b.department === filters.department);
    }
    if (filters.month) {
      filtered = filtered.filter(b => b.month === parseInt(filters.month));
    }
    if (filters.year) {
      filtered = filtered.filter(b => b.year === parseInt(filters.year));
    }
    
    setBudgets(filtered);
    setTotalCount(filtered.length);
  }, [budgets, fetchBudgets]);

  const clearError = () => {
    setError('');
  };

  return {
    budgets,
    loading,
    error,
    totalCount,
    fetchBudgets,
    addBudget,
    editBudget,
    removeBudget,
    getBudget,
    getBudgetByDeptMonthYear,
    budgetExists,
    searchBudgets,
    clearError
  };
};