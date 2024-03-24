import md5 from "md5"

/**
 * Gravatar image user
 *
 * @param email - Person's email
 * @returns Gravatar url
 */
export const gravatarImage = (email: string) => {
  const hash = md5(email || "")
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=128`
}
