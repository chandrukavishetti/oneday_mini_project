// Department enums from backend
export const DEPARTMENTS = [
  'ENGINEERING',
  'SALES',
  'MARKETING',
  'FINANCE',
  'HUMAN_RESOURCES',
  'OPERATIONS',
  'RESEARCH_DEVELOPMENT',
  'CUSTOMER_SUPPORT',
  'ADMINISTRATION',
  'LEGAL'
];

// Expense category enums from backend
export const EXPENSE_CATEGORIES = [
  'TRAVEL',
  'MEALS',
  'ACCOMMODATION',
  'OFFICE_SUPPLIES',
  'TRAINING',
  'VEHICLE',
  'UTILITIES',
  'MARKETING',
  'MISCELLANEOUS'
];

// Claim status enums from backend
export const CLAIM_STATUSES = [
  'PENDING',
  'APPROVED',
  'REJECTED'
];

// API endpoints
export const API_ENDPOINTS = {
  CLAIMS: {
    SUBMIT: '/claims/submit',
    REVIEW: '/claims/review',
    ALL: '/claims/all',
    BY_ID: '/claims',
    BY_DEPARTMENT: '/claims/department',
    BY_STATUS: '/claims/status',
    BY_MONTH: '/claims/month',
    FILTER: '/claims/filter',
    SUMMARY: '/claims/summary'
  },
  BUDGETS: {
    CREATE: '/budgets/create',
    UPDATE: '/budgets/update',
    ALL: '/budgets/all',
    BY_ID: '/budgets',
    FIND: '/budgets/find',
    DELETE: '/budgets',
    EXISTS: '/budgets/exists'
  }
};

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

// Validation constants
export const VALIDATION = {
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_AMOUNT: 0.01,
  MIN_BUDGET_AMOUNT: 0.01,
  MIN_YEAR: 2020
};

// Default values
export const DEFAULTS = {
  CURRENT_YEAR: new Date().getFullYear(),
  CURRENT_MONTH: new Date().getMonth() + 1,
  ITEMS_PER_PAGE: 6
};

// Month names
export const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' }
];