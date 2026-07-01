import { useState, useCallback } from 'react';
import { getMonthlySummary } from '../api/claimAPI';

export const useSummary = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSummary = useCallback(async (department, month, year) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await getMonthlySummary({ department, month, year });
      setSummaryData(response);
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch summary';
      setError(errorMsg);
      setSummaryData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSummary = () => {
    setSummaryData(null);
    setError('');
  };

  const clearError = () => {
    setError('');
  };

  // Helper function to format summary data for display
  const getFormattedSummary = useCallback(() => {
    if (!summaryData) return null;

    const budgetUsage = summaryData.monthlyBudget > 0 
      ? ((summaryData.totalApprovedExpense / summaryData.monthlyBudget) * 100)
      : 0;

    const approvalRate = (summaryData.approvedCount + summaryData.rejectedCount) > 0
      ? ((summaryData.approvedCount / (summaryData.approvedCount + summaryData.rejectedCount)) * 100)
      : 0;

    const totalClaims = summaryData.pendingCount + summaryData.approvedCount + summaryData.rejectedCount;

    return {
      ...summaryData,
      budgetUsage,
      approvalRate,
      totalClaims,
      isOverBudget: summaryData.remainingBudget < 0,
      budgetStatus: summaryData.remainingBudget >= 0 ? 'Within Budget' : 'Over Budget'
    };
  }, [summaryData]);

  return {
    summaryData,
    loading,
    error,
    fetchSummary,
    clearSummary,
    clearError,
    getFormattedSummary
  };
};