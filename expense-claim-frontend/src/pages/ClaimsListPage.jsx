import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { ClaimList } from '../components/claims';
import { PageHeader } from '../components/common';
import { getClaimsByFilters } from '../api/claimAPI';

const ClaimsListPage = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    monthYear: '',
    status: '',
    category: ''
  });

  useEffect(() => {
    fetchClaims();
  }, [filters]);

  const fetchClaims = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Remove empty filters
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '')
      );
      
      const response = await getClaimsByFilters(activeFilters);
      setClaims(response || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch claims');
      setClaims([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Container>
      <PageHeader 
        title="All Claims"
        subtitle="View and filter all expense claims"
        breadcrumbs={[{ label: 'Claims' }]}
      />
      
      <ClaimList 
        claims={claims}
        loading={loading}
        error={error}
        onFilterChange={handleFilterChange}
        filters={filters}
        showReviewButton={false}
      />
    </Container>
  );
};

export default ClaimsListPage;