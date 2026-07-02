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
  const [modalError, setModalError] = useState(''); // Separate error for modal

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
    setModalError(''); // Clear any previous error
    setShowModal(true);
  };

  const handleReviewSubmit = async (reviewData) => {
    setIsReviewing(true);
    setModalError(''); // Clear previous error
    
    try {
      await reviewClaim(reviewData);
      setShowModal(false);
      setSelectedClaim(null);
      setModalError('');
      // Refresh claims list
      await fetchClaims();
    } catch (err) {
      // Extract error message from response
      let errorMsg = 'Failed to review claim';
      if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.message) {
        errorMsg = err.message;
      }
      setModalError(errorMsg);
    } finally {
      setIsReviewing(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedClaim(null);
    setModalError('');
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
        error={modalError} // Pass error to modal
      />
    </Container>
  );
};

export default ReviewClaimsPage;