import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { ClaimList, ReviewClaimModal } from '../components/claims';
import { PageHeader } from '../components/common';
import { getClaimsByFilters, reviewClaim } from '../api/claimAPI';

const ReviewClaimsPage = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    monthYear: '',
    status: 'PENDING',
    category: ''
  });
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    fetchClaims();
  }, [filters]);

  const fetchClaims = async () => {
    setLoading(true);
    setError('');
    
    try {
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

  const handleReviewClick = (claim) => {
    setSelectedClaim(claim);
    setShowModal(true);
  };

  const handleReviewSubmit = async (reviewData) => {
    setIsReviewing(true);
    setError('');
    
    try {
      await reviewClaim(reviewData);
      setShowModal(false);
      setSelectedClaim(null);
      // Refresh claims list
      await fetchClaims();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to review claim');
    } finally {
      setIsReviewing(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedClaim(null);
    setError('');
  };

  return (
    <Container>
      <PageHeader 
        title="Review Claims"
        subtitle="Approve or reject pending expense claims"
        breadcrumbs={[{ label: 'Review' }]}
      />
      
      <ClaimList 
        claims={claims}
        loading={loading}
        error={error}
        onFilterChange={handleFilterChange}
        filters={filters}
        onReview={handleReviewClick}
        showReviewButton={true}
      />

      <ReviewClaimModal
        show={showModal}
        onClose={handleModalClose}
        claim={selectedClaim}
        onReview={handleReviewSubmit}
        isLoading={isReviewing}
      />
    </Container>
  );
};

export default ReviewClaimsPage;