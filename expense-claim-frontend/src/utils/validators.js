/**
 * Validate claim form data
 * @param {Object} data - Claim form data
 * @returns {Object} Validation errors
 */
export const validateClaimForm = (data) => {
  const errors = {};

  if (!data.employeeName || data.employeeName.trim() === '') {
    errors.employeeName = 'Employee name is required';
  }

  if (!data.department) {
    errors.department = 'Department is required';
  }

  if (!data.category) {
    errors.category = 'Expense category is required';
  }

  if (!data.amount) {
    errors.amount = 'Amount is required';
  } else if (parseFloat(data.amount) <= 0) {
    errors.amount = 'Amount must be greater than zero';
  }

  if (!data.expenseDate) {
    errors.expenseDate = 'Expense date is required';
  } else {
    const date = new Date(data.expenseDate);
    const today = new Date();
    if (date > today) {
      errors.expenseDate = 'Expense date cannot be in the future';
    }
  }

  if (!data.description || data.description.trim() === '') {
    errors.description = 'Description is required';
  } else if (data.description.length > 500) {
    errors.description = 'Description must not exceed 500 characters';
  }

  return errors;
};

/**
 * Validate budget form data
 * @param {Object} data - Budget form data
 * @returns {Object} Validation errors
 */
export const validateBudgetForm = (data) => {
  const errors = {};

  if (!data.department) {
    errors.department = 'Department is required';
  }

  if (!data.month) {
    errors.month = 'Month is required';
  } else if (data.month < 1 || data.month > 12) {
    errors.month = 'Month must be between 1 and 12';
  }

  if (!data.year) {
    errors.year = 'Year is required';
  } else if (data.year < 2020) {
    errors.year = 'Year must be 2020 or later';
  }

  if (!data.budgetAmount) {
    errors.budgetAmount = 'Budget amount is required';
  } else if (parseFloat(data.budgetAmount) <= 0) {
    errors.budgetAmount = 'Budget amount must be greater than zero';
  }

  return errors;
};

/**
 * Validate review form data
 * @param {Object} data - Review form data
 * @returns {Object} Validation errors
 */
export const validateReviewForm = (data) => {
  const errors = {};

  if (!data.status) {
    errors.status = 'Status is required';
  }

  if (!data.reviewRemark || data.reviewRemark.trim() === '') {
    errors.reviewRemark = 'Review remark is required';
  }

  return errors;
};

/**
 * Validate department exists in allowed list
 * @param {string} department - Department to validate
 * @returns {boolean} True if valid
 */
export const isValidDepartment = (department) => {
  const validDepartments = [
    'ENGINEERING', 'SALES', 'MARKETING', 'FINANCE',
    'HUMAN_RESOURCES', 'OPERATIONS', 'RESEARCH_DEVELOPMENT',
    'CUSTOMER_SUPPORT', 'ADMINISTRATION', 'LEGAL'
  ];
  return validDepartments.includes(department);
};

/**
 * Validate expense category exists in allowed list
 * @param {string} category - Category to validate
 * @returns {boolean} True if valid
 */
export const isValidCategory = (category) => {
  const validCategories = [
    'TRAVEL', 'MEALS', 'ACCOMMODATION', 'OFFICE_SUPPLIES',
    'TRAINING', 'VEHICLE', 'UTILITIES', 'MARKETING', 'MISCELLANEOUS'
  ];
  return validCategories.includes(category);
};

/**
 * Validate claim status exists in allowed list
 * @param {string} status - Status to validate
 * @returns {boolean} True if valid
 */
export const isValidStatus = (status) => {
  const validStatuses = ['PENDING', 'APPROVED', 'REJECTED'];
  return validStatuses.includes(status);
};

/**
 * Validate email format (basic)
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (basic)
 * @param {string} phone - Phone to validate
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate date is not in future
 * @param {string|Date} date - Date to validate
 * @returns {boolean} True if not in future
 */
export const isNotFutureDate = (date) => {
  if (!date) return false;
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return dateObj <= today;
};

/**
 * Validate month-year format (MM-YYYY)
 * @param {string} monthYear - Month-year string
 * @returns {boolean} True if valid format
 */
export const isValidMonthYear = (monthYear) => {
  if (!monthYear) return false;
  const regex = /^(0[1-9]|1[0-2])-\d{4}$/;
  return regex.test(monthYear);
};