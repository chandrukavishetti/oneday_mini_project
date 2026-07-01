import React from 'react';
import { Badge } from 'react-bootstrap';

const StatusBadge = ({ status }) => {
  const getVariant = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return 'warning';
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getIcon = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return '⏳';
      case 'APPROVED':
        return '✅';
      case 'REJECTED':
        return '❌';
      default:
        return '📋';
    }
  };

  return (
    <Badge bg={getVariant(status)} className="px-3 py-2">
      {getIcon(status)} {status}
    </Badge>
  );
};

export default StatusBadge;