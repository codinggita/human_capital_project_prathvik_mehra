/**
 * Utility functions for formatting values
 */

/**
 * Format numbers with thousands separators
 * @param {number|string} num - Value to format
 * @param {number} decimals - Decimal places
 * @returns {string} Formatted number
 */
export const formatNumber = (num, decimals = 0) => {
  if (num === null || num === undefined || isNaN(num)) return '0';
  return Number(num).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Format percentages
 * @param {number|string} num - Value to format
 * @param {number} decimals - Decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercent = (num, decimals = 1) => {
  if (num === null || num === undefined || isNaN(num)) return '0.0%';
  return `${Number(num).toFixed(decimals)}%`;
};

/**
 * Format values as Currency
 * @param {number|string} num - Value to format
 * @param {string} currency - ISO currency code
 * @param {number} decimals - Decimal places
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (num, currency = 'USD', decimals = 2) => {
  if (num === null || num === undefined || isNaN(num)) return '$0.00';
  return Number(num).toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Format Date string into user friendly format
 * @param {string} dateString - Date string
 * @param {Object} options - Custom Date formatting options
 * @returns {string} Formatted date
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  const defaultOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString(undefined, { ...defaultOptions, ...options });
};

/**
 * Capitalize first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (typeof str !== 'string' || !str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
