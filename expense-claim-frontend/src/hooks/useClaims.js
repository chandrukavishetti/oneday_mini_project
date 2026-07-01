import { useState, useEffect, useCallback } from 'react';
import { 
  getAllClaims, 
  getClaimsByFilters, 
  submitClaim, 
  reviewClaim,
  getClaimById,
  getClaimsByDepartment,
  getClaimsByStatus,
  getClaimsByMonthYear
} from '../api/claimAPI';

export const useClaims = (initialFilters = {}) => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [totalCount, setTotalCount] = useState(0);

  const fetchClaims = useCallback(async (filterParams = filters) => {
    setLoading(true);
    setError('');
    
    try {
      // Remove empty filters
      const activeFilters = Object.fromEntries(
        Object.entries(filterParams).filter(([_, value]) => value !== '')
      );
      
      let response;
      if (Object.keys(activeFilters).length === 0) {
        response = await getAllClaims();
      } else {
        response = await getClaimsByFilters(activeFilters);
      }
      
      setClaims(response || []);
      setTotalCount(response?.length || 0);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch claims';
      setError(errorMsg);
      setClaims([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);

  const addClaim = async (claimData) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await submitClaim(claimData);
      await fetchClaims();
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to submit claim';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateClaim = async (reviewData) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await reviewClaim(reviewData);
      await fetchClaims();
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to review claim';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getClaim = async (id) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await getClaimById(id);
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch claim';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getClaimsByDept = async (department) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await getClaimsByDepartment(department);
      setClaims(response || []);
      setTotalCount(response?.length || 0);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch claims';
      setError(errorMsg);
      setClaims([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const getClaimsByStat = async (status) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await getClaimsByStatus(status);
      setClaims(response || []);
      setTotalCount(response?.length || 0);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch claims';
      setError(errorMsg);
      setClaims([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const getClaimsByMonth = async (monthYear) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await getClaimsByMonthYear(monthYear);
      setClaims(response || []);
      setTotalCount(response?.length || 0);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch claims';
      setError(errorMsg);
      setClaims([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const clearError = () => {
    setError('');
  };

  return {
    claims,
    loading,
    error,
    filters,
    totalCount,
    fetchClaims,
    addClaim,
    updateClaim,
    getClaim,
    getClaimsByDept,
    getClaimsByStat,
    getClaimsByMonth,
    updateFilters,
    resetFilters,
    clearError
  };
};