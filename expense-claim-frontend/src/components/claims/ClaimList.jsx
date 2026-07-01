// import React, { useState } from 'react';
// import { Row, Col, Spinner, Alert } from 'react-bootstrap';
// import ClaimCard from './ClaimCard';
// import ClaimFilters from './ClaimFilters';
// import EmptyState from '../common/EmptyState';

// const ClaimList = ({ 
//   claims, 
//   loading, 
//   error, 
//   onFilterChange, 
//   filters,
//   onReview,
//   showReviewButton = false 
// }) => {
//   const [selectedClaim, setSelectedClaim] = useState(null);

//   if (loading) {
//     return (
//       <div className="text-center my-5">
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-2">Loading claims...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return <Alert variant="danger">{error}</Alert>;
//   }

//   if (!claims || claims.length === 0) {
//     return (
//       <>
//         <ClaimFilters onFilterChange={onFilterChange} filters={filters} />
//         <EmptyState 
//           title="No Claims Found"
//           message="No claims match your filters. Try adjusting your search criteria."
//           icon="📋"
//         />
//       </>
//     );
//   }

//   return (
//     <>
//       <ClaimFilters onFilterChange={onFilterChange} filters={filters} />
      
//       <Row className="mt-3">
//         <Col>
//           <p className="text-muted">
//             Showing {claims.length} claim{claims.length !== 1 ? 's' : ''}
//           </p>
//         </Col>
//       </Row>

//       <Row>
//         {claims.map(claim => (
//           <Col key={claim.id} md={6} lg={4} className="mb-3">
//             <ClaimCard 
//               claim={claim} 
//               onReview={onReview}
//               showReviewButton={showReviewButton}
//             />
//           </Col>
//         ))}
//       </Row>
//     </>
//   );
// };

// export default ClaimList;

// In components/claims/ClaimList.jsx
import React, { useState } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import ClaimCard from './ClaimCard';
import ClaimFilters from './ClaimFilters';
import EmptyState from '../common/EmptyState';

const ClaimList = ({ 
  claims, 
  loading, 
  error, 
  onFilterChange, 
  filters,
  onReview,
  showReviewButton = false 
}) => {
  const [selectedClaim, setSelectedClaim] = useState(null);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading claims...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!claims || claims.length === 0) {
    return (
      <>
        <ClaimFilters onFilterChange={onFilterChange} filters={filters} />
        <EmptyState 
          title="No Claims Found"
          message="No claims match your filters. Try adjusting your search criteria."
          icon="📋"
        />
      </>
    );
  }

  return (
    <>
      <ClaimFilters onFilterChange={onFilterChange} filters={filters} />
      
      <Row className="mt-3">
        <Col>
          <p className="text-muted">
            Showing {claims.length} claim{claims.length !== 1 ? 's' : ''}
          </p>
        </Col>
      </Row>

      <Row>
        {claims.map(claim => (
          <Col key={claim.id || Math.random()} md={6} lg={4} className="mb-3">
            <ClaimCard 
              claim={claim} 
              onReview={onReview}
              showReviewButton={showReviewButton}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ClaimList;