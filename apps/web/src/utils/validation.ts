/**
 * Validate an email address
 * @param email - Email address
 * @returns True is email is valid
 */
export const validateEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email)
}
