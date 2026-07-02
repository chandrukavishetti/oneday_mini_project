import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import StatusBadge from '../common/StatusBadge';
import { formatCurrency } from '../../utils/formatters';

const ClaimCard = ({ claim, onReview, showReviewButton = false }) => {
  const isPending = claim.status === 'PENDING';

  // Safely format currency
  const getFormattedCurrency = (amount) => {
    try {
      return formatCurrency(amount);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return '$0.00';
    }
  };

  return (
    <Card className="h-100 shadow-sm claim-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="mb-0">{claim.employeeName || 'Unknown'}</h5>
          <StatusBadge status={claim.status} />
        </div>
        
        <div className="mb-2">
          <span className="badge bg-secondary me-1">{claim.department || 'N/A'}</span>
          <span className="badge bg-info">{claim.category || 'N/A'}</span>
        </div>

        <h4 className="text-primary mb-2 claim-amount">{getFormattedCurrency(claim.amount)}</h4>
        
        {/* Only show Month, removed Date */}
        <Row className="small text-muted mb-2">
          <Col xs={12}>Month: {claim.monthYear || 'N/A'}</Col>
        </Row>

        <p className="card-text small">{claim.description || 'No description'}</p>

        {claim.reviewRemark && (
          <div className="mt-2 p-2 bg-light rounded">
            <small className="text-muted">
              <strong>Review Remark:</strong> {claim.reviewRemark}
            </small>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">
            {claim.createdAt ? new Date(claim.createdAt).toLocaleDateString() : 'N/A'}
          </small>
          {showReviewButton && isPending && (
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => onReview(claim)}
            >
              Review Claim
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ClaimCard;