// /**
//  * Format date to readable format
//  * @param {string|Date} date - Date to format
//  * @param {string} format - Format type ('short', 'medium', 'long')
//  * @returns {string} Formatted date string
//  */
// export const formatDate = (date, format = 'medium') => {
//   if (!date) return 'N/A';
  
//   let dateObj;
  
//   try {
//     // If it's already a Date object
//     if (date instanceof Date) {
//       dateObj = date;
//     } else if (typeof date === 'string') {
//       // For YYYY-MM-DD format from backend
//       if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
//         const parts = date.split('-');
//         dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
//       } else {
//         dateObj = new Date(date);
//       }
//     } else if (typeof date === 'number') {
//       dateObj = new Date(date);
//     } else {
//       return 'Invalid Date';
//     }
    
//     // Check if date is valid
//     if (isNaN(dateObj.getTime())) {
//       return 'Invalid Date';
//     }
//   } catch (error) {
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
  
  console.log('Formatting date:', date, 'Type:', typeof date);
  
  let dateObj;
  
  try {
    // If it's already a Date object
    if (date instanceof Date) {
      dateObj = date;
    } else if (typeof date === 'string') {
      // Try multiple formats
      let parsed = new Date(date);
      
      // If invalid, try YYYY-MM-DD format manually
      if (isNaN(parsed.getTime()) && date.includes('-')) {
        const parts = date.split('-');
        if (parts.length === 3) {
          // parts[0] = year, parts[1] = month, parts[2] = day
          parsed = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        }
      }
      
      // If still invalid, try with replacing - with /
      if (isNaN(parsed.getTime()) && date.includes('-')) {
        const newDate = date.replace(/-/g, '/');
        parsed = new Date(newDate);
      }
      
      dateObj = parsed;
    } else if (typeof date === 'number') {
      dateObj = new Date(date);
    } else {
      return 'Invalid Date';
    }
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      console.log('Invalid date after parsing:', date);
      return 'Invalid Date';
    }
  } catch (error) {
    console.error('Date parsing error:', error);
    return 'Invalid Date';
  }

  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    medium: { year: 'numeric', month: 'long', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  };

  const formatted = new Intl.DateTimeFormat('en-US', options[format] || options.medium).format(dateObj);
  console.log('Formatted date:', formatted);
  return formatted;
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