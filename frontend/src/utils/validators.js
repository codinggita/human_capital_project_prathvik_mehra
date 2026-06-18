/**
 * Generic regular expressions and validation helper functions
 */

// Email regex pattern matching general standard specifications
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

// Password validation: minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

/**
 * Verify if email matches standard formats
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  return EMAIL_REGEX.test(email);
};

/**
 * Check if password meets complexity guidelines
 * @param {string} password - Password to validate
 * @returns {boolean} Is strong password
 */
export const isStrongPassword = (password) => {
  if (!password) return false;
  return PASSWORD_REGEX.test(password);
};

/**
 * Validate that a value is numeric and finite
 * @param {*} val - Value to check
 * @returns {boolean} Is numeric
 */
export const isNumeric = (val) => {
  return !isNaN(parseFloat(val)) && isFinite(val);
};
