import { useState, useCallback } from 'react';

export const useNotification = () => {
  const [notification, setNotification] = useState({
    show: false,
    type: 'info',
    message: ''
  });

  const showNotification = useCallback((message, type = 'info', duration = 5000) => {
    setNotification({
      show: true,
      type,
      message
    });

    if (duration > 0) {
      setTimeout(() => {
        hideNotification();
      }, duration);
    }
  }, []);

  const hideNotification = useCallback(() => {
    setNotification({
      show: false,
      type: 'info',
      message: ''
    });
  }, []);

  const showSuccess = useCallback((message, duration = 5000) => {
    showNotification(message, 'success', duration);
  }, [showNotification]);

  const showError = useCallback((message, duration = 5000) => {
    showNotification(message, 'error', duration);
  }, [showNotification]);

  const showInfo = useCallback((message, duration = 5000) => {
    showNotification(message, 'info', duration);
  }, [showNotification]);

  const showWarning = useCallback((message, duration = 5000) => {
    showNotification(message, 'warning', duration);
  }, [showNotification]);

  return {
    notification,
    showNotification,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    hideNotification
  };
};