/**
 * Validate an email address
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = email => {
  return /\S+@\S+\.\S+/.test(email)
}
