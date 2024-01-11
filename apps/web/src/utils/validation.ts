/**
 * Validate an email address
 * @param email
 * @returns True is email is valid
 */
export const validateEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email)
}
