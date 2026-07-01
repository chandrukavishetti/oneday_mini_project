import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  notifications: [],
  loading: false,
  error: null,
  userRole: 'EMPLOYEE', // 'EMPLOYEE' or 'FINANCE_MANAGER'
  refreshClaims: false,
  refreshBudgets: false
};

// Action types
const ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  CLEAR_NOTIFICATIONS: 'CLEAR_NOTIFICATIONS',
  SET_USER_ROLE: 'SET_USER_ROLE',
  TOGGLE_REFRESH_CLAIMS: 'TOGGLE_REFRESH_CLAIMS',
  TOGGLE_REFRESH_BUDGETS: 'TOGGLE_REFRESH_BUDGETS'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case ACTION_TYPES.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, {
          id: Date.now(),
          ...action.payload
        }]
      };

    case ACTION_TYPES.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };

    case ACTION_TYPES.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: []
      };

    case ACTION_TYPES.SET_USER_ROLE:
      return {
        ...state,
        userRole: action.payload
      };

    case ACTION_TYPES.TOGGLE_REFRESH_CLAIMS:
      return {
        ...state,
        refreshClaims: !state.refreshClaims
      };

    case ACTION_TYPES.TOGGLE_REFRESH_BUDGETS:
      return {
        ...state,
        refreshBudgets: !state.refreshBudgets
      };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators
  const setLoading = (loading) => {
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error });
  };

  const clearError = () => {
    dispatch({ type: ACTION_TYPES.CLEAR_ERROR });
  };

  const addNotification = (notification) => {
    dispatch({ type: ACTION_TYPES.ADD_NOTIFICATION, payload: notification });
  };

  const removeNotification = (id) => {
    dispatch({ type: ACTION_TYPES.REMOVE_NOTIFICATION, payload: id });
  };

  const clearNotifications = () => {
    dispatch({ type: ACTION_TYPES.CLEAR_NOTIFICATIONS });
  };

  const setUserRole = (role) => {
    dispatch({ type: ACTION_TYPES.SET_USER_ROLE, payload: role });
  };

  const refreshClaims = () => {
    dispatch({ type: ACTION_TYPES.TOGGLE_REFRESH_CLAIMS });
  };

  const refreshBudgets = () => {
    dispatch({ type: ACTION_TYPES.TOGGLE_REFRESH_BUDGETS });
  };

  const showSuccess = (message) => {
    addNotification({
      type: 'success',
      message,
      duration: 5000
    });
  };

  const showError = (message) => {
    addNotification({
      type: 'error',
      message,
      duration: 5000
    });
  };

  const showInfo = (message) => {
    addNotification({
      type: 'info',
      message,
      duration: 5000
    });
  };

  const showWarning = (message) => {
    addNotification({
      type: 'warning',
      message,
      duration: 5000
    });
  };

  const value = {
    // State
    ...state,
    // Actions
    setLoading,
    setError,
    clearError,
    addNotification,
    removeNotification,
    clearNotifications,
    setUserRole,
    refreshClaims,
    refreshBudgets,
    showSuccess,
    showError,
    showInfo,
    showWarning
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;