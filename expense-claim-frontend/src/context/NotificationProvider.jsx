import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useAppContext } from './AppContext';

export const NotificationProvider = ({ children }) => {
  const { notifications, removeNotification } = useAppContext();

  return (
    <>
      {children}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        {notifications.map((notification) => (
          <Toast
            key={notification.id}
            bg={notification.type === 'success' ? 'success' : 
                notification.type === 'error' ? 'danger' :
                notification.type === 'warning' ? 'warning' : 'info'}
            onClose={() => removeNotification(notification.id)}
            delay={notification.duration || 5000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">
                {notification.type === 'success' && '✅ Success'}
                {notification.type === 'error' && '❌ Error'}
                {notification.type === 'warning' && '⚠️ Warning'}
                {notification.type === 'info' && 'ℹ️ Info'}
              </strong>
            </Toast.Header>
            <Toast.Body className={notification.type === 'warning' ? 'text-dark' : 'text-white'}>
              {notification.message}
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </>
  );
};