import MD5 from "crypto-js/md5"

/**
 * Gravatar image user
 *
 * @param email Person's email
 * @returns Gravatar url
 */
const gravatarImage = (email: string) => {
  const hash = MD5(email || "")
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=128`
}

export default gravatarImage
