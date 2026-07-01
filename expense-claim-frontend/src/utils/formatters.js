// /**
//  * Format currency amount to USD
//  * @param {number} amount - Amount to format
//  * @returns {string} Formatted currency string
//  */
// export const formatCurrency = (amount) => {
//   if (amount === null || amount === undefined) {
//     return '$0.00';
//   }
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
//   }).format(amount);
// };

// /**
//  * Format date to readable format
//  * @param {string|Date} date - Date to format
//  * @param {string} format - Format type ('short', 'medium', 'long')
//  * @returns {string} Formatted date string
//  */
// export const formatDate = (date, format = 'medium') => {
//   if (!date) return 'N/A';
  
//   const dateObj = typeof date === 'string' ? new Date(date) : date;
  
//   if (isNaN(dateObj.getTime())) {
//     return 'Invalid Date';
//   }

//   const options = {
//     short: { year: 'numeric', month: 'short', day: 'numeric' },
//     medium: { year: 'numeric', month: 'long', day: 'numeric' },
//     long: { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
//   };

//   return new Intl.DateTimeFormat('en-US', options[format] || options.medium).format(dateObj);
// };

// /**
//  * Format month and year to display format
//  * @param {number} month - Month number (1-12)
//  * @param {number} year - Year
//  * @returns {string} Formatted month-year string
//  */
// export const formatMonthYear = (month, year) => {
//   if (!month || !year) return 'N/A';
//   const monthNames = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];
//   return `${monthNames[month - 1]} ${year}`;
// };

// /**
//  * Format month-year to MM-YYYY format
//  * @param {number} month - Month number (1-12)
//  * @param {number} year - Year
//  * @returns {string} MM-YYYY format
//  */
// export const toMonthYearString = (month, year) => {
//   return `${String(month).padStart(2, '0')}-${year}`;
// };

// /**
//  * Parse MM-YYYY string to month and year
//  * @param {string} monthYear - MM-YYYY format
//  * @returns {Object} { month, year }
//  */
// export const parseMonthYear = (monthYear) => {
//   if (!monthYear) return null;
//   const [month, year] = monthYear.split('-');
//   return {
//     month: parseInt(month),
//     year: parseInt(year)
//   };
// };

// /**
//  * Format percentage
//  * @param {number} value - Value to format
//  * @param {number} decimals - Number of decimal places
//  * @returns {string} Formatted percentage
//  */
// export const formatPercentage = (value, decimals = 1) => {
//   if (value === null || value === undefined || isNaN(value)) {
//     return '0%';
//   }
//   return `${value.toFixed(decimals)}%`;
// };

// /**
//  * Truncate text with ellipsis
//  * @param {string} text - Text to truncate
//  * @param {number} length - Maximum length
//  * @returns {string} Truncated text
//  */
// export const truncateText = (text, length = 100) => {
//   if (!text) return '';
//   if (text.length <= length) return text;
//   return text.substring(0, length) + '...';
// };

// /**
//  * Format claim status to display with icon
//  * @param {string} status - Claim status
//  * @returns {string} Formatted status with icon
//  */
// export const formatStatusWithIcon = (status) => {
//   const statusMap = {
//     'PENDING': '⏳ Pending',
//     'APPROVED': '✅ Approved',
//     'REJECTED': '❌ Rejected'
//   };
//   return statusMap[status] || status;
// };

// /**
//  * Get color for status
//  * @param {string} status - Claim status
//  * @returns {string} Bootstrap color class
//  */
// export const getStatusColor = (status) => {
//   const colorMap = {
//     'PENDING': 'warning',
//     'APPROVED': 'success',
//     'REJECTED': 'danger'
//   };
//   return colorMap[status] || 'secondary';
// };

// /**
//  * Format department name for display
//  * @param {string} department - Department enum
//  * @returns {string} Formatted department name
//  */
// export const formatDepartment = (department) => {
//   if (!department) return '';
//   return department
//     .toLowerCase()
//     .split('_')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// };

// /**
//  * Format expense category for display
//  * @param {string} category - Category enum
//  * @returns {string} Formatted category name
//  */
// export const formatCategory = (category) => {
//   if (!category) return '';
//   return category
//     .toLowerCase()
//     .split('_')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// };


















// /**
//  * Format date to readable format
//  * @param {string|Date} date - Date to format
//  * @param {string} format - Format type ('short', 'medium', 'long')
//  * @returns {string} Formatted date string
//  */
// export const formatDate = (date, format = 'medium') => {
//   if (!date) return 'N/A';
  
//   // Handle different date formats
//   let dateObj;
  
//   // If it's already a Date object
//   if (date instanceof Date) {
//     dateObj = date;
//   } else if (typeof date === 'string') {
//     // Try to parse the string
//     dateObj = new Date(date);
//   } else if (typeof date === 'number') {
//     // If it's a timestamp
//     dateObj = new Date(date);
//   } else {
//     return 'Invalid Date';
//   }
  
//   // Check if date is valid
//   if (isNaN(dateObj.getTime())) {
//     return 'Invalid Date';
//   }

//   const options = {
//     short: { year: 'numeric', month: 'short', day: 'numeric' },
//     medium: { year: 'numeric', month: 'long', day: 'numeric' },
//     long: { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
//   };

//   return new Intl.DateTimeFormat('en-US', options[format] || options.medium).format(dateObj);
// };

// /**
//  * Format currency amount to USD
//  * @param {number} amount - Amount to format
//  * @returns {string} Formatted currency string
//  */
// export const formatCurrency = (amount) => {
//   if (amount === null || amount === undefined || isNaN(amount)) {
//     return '$0.00';
//   }
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
//   }).format(amount);
// };

















/**
 * Format date to readable format
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type ('short', 'medium', 'long')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'medium') => {
  if (!date) return 'N/A';
  
  let dateObj;
  
  try {
    // If it's already a Date object
    if (date instanceof Date) {
      dateObj = date;
    } else if (typeof date === 'string') {
      // For YYYY-MM-DD format from backend
      if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const parts = date.split('-');
        dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
      } else {
        dateObj = new Date(date);
      }
    } else if (typeof date === 'number') {
      dateObj = new Date(date);
    } else {
      return 'Invalid Date';
    }
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }
  } catch (error) {
    return 'Invalid Date';
  }

  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    medium: { year: 'numeric', month: 'long', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  };

  return new Intl.DateTimeFormat('en-US', options[format] || options.medium).format(dateObj);
};

/**
 * Format currency amount to USD
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '$0.00';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};














