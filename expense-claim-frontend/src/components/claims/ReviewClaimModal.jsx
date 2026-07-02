import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import StatusBadge from '../common/StatusBadge';
import { formatCurrency } from '../../utils/formatters';

const ReviewClaimModal = ({ 
  show, 
  onClose, 
  claim, 
  onReview, 
  isLoading,
  error: externalError // Receive error from parent
}) => {
  const [reviewData, setReviewData] = useState({
    status: 'APPROVED',
    reviewRemark: ''
  });
  const [localError, setLocalError] = useState('');

  // Use external error if provided, otherwise use local error
  const displayError = externalError || localError;

  // Reset local error when modal opens or external error changes
  useEffect(() => {
    if (show) {
      setLocalError('');
    }
  }, [show, externalError]);

  if (!claim) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData(prev => ({
      ...prev,
      [name]: value
    }));
    setLocalError('');
  };

  const handleSubmit = () => {
    if (!reviewData.reviewRemark.trim()) {
      setLocalError('Review remark is required');
      return;
    }
    onReview({
      claimId: claim.id,
      status: reviewData.status,
      reviewRemark: reviewData.reviewRemark
    });
  };

  const handleClose = () => {
    setReviewData({
      status: 'APPROVED',
      reviewRemark: ''
    });
    setLocalError('');
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Review Claim</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Error displayed prominently at the top */}
        {displayError && (
          <Alert variant="danger" className="mb-3" onClose={() => setLocalError('')} dismissible>
            <Alert.Heading>Cannot Approve Claim!</Alert.Heading>
            <p>{displayError}</p>
            {displayError.includes('budget') && (
              <p className="mb-0 small">
                <strong>Tip:</strong> Make sure a budget exists for {claim?.department} for {claim?.monthYear}
              </p>
            )}
          </Alert>
        )}

        <div className="bg-light p-3 rounded mb-3">
          <h6>Claim Details</h6>
          <div className="row">
            <div className="col-md-6">
              <p className="mb-1"><strong>Employee:</strong> {claim.employeeName}</p>
              <p className="mb-1"><strong>Department:</strong> {claim.department}</p>
              <p className="mb-1"><strong>Category:</strong> {claim.category}</p>
              <p className="mb-1"><strong>Month:</strong> {claim.monthYear || 'N/A'}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-1"><strong>Amount:</strong> {formatCurrency(claim.amount)}</p>
              <p className="mb-1"><strong>Status:</strong> <StatusBadge status={claim.status} /></p>
            </div>
          </div>
          <p className="mb-0"><strong>Description:</strong> {claim.description}</p>
        </div>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Decision *</Form.Label>
            <Form.Select
              name="status"
              value={reviewData.status}
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value="APPROVED">Approve</option>
              <option value="REJECTED">Reject</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Review Remark *</Form.Label>
            <Form.Control
              as="textarea"
              name="reviewRemark"
              value={reviewData.reviewRemark}
              onChange={handleChange}
              placeholder="Enter review remarks..."
              rows={3}
              disabled={isLoading}
              isInvalid={!!localError && !reviewData.reviewRemark.trim()}
            />
            <Form.Control.Feedback type="invalid">
              Review remark is required
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button 
          variant={reviewData.status === 'APPROVED' ? 'success' : 'danger'}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : reviewData.status === 'APPROVED' ? 'Approve Claim' : 'Reject Claim'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewClaimModal;