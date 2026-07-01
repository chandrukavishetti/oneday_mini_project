import React from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PageHeader = ({ title, subtitle, breadcrumbs = [] }) => {
  return (
    <Row className="mb-4">
      <Col>
        <h2 className="mb-1">{title}</h2>
        {subtitle && <p className="text-muted">{subtitle}</p>}
        {breadcrumbs.length > 0 && (
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
              Home
            </Breadcrumb.Item>
            {breadcrumbs.map((crumb, index) => (
              <Breadcrumb.Item
                key={index}
                active={index === breadcrumbs.length - 1}
                linkAs={crumb.to ? Link : undefined}
                linkProps={crumb.to ? { to: crumb.to } : undefined}
              >
                {crumb.label}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        )}
      </Col>
    </Row>
  );
};

export default PageHeader;