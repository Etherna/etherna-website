import DirectusClient from "@directus/sdk-js"

export const StorageKeys = {
  token: "auth:token",
  name: "user:name",
  email: "user:email",
  avatar: "user:avatar",
}

const token = typeof window !== undefined
  ? window.localStorage.getItem(StorageKeys.token)
  : null

const directusClient = new DirectusClient({
  url: process.env.DIRECTUS_URL,
  project: process.env.DIRECTUS_PROJECT,
  token
})

export const getCurrentUser = () => {
  if (typeof window === "undefined") return null

  const token = window.localStorage.getItem(StorageKeys.token)
  if (token == null) return null

  const user = {
    name: window.localStorage.getItem(StorageKeys.name),
    email: window.localStorage.getItem(StorageKeys.email),
    avatar: window.localStorage.getItem(StorageKeys.avatar),
  }

  return user
}

export const currentUserToken = () =>
  window.localStorage.getItem(StorageKeys.token)

export const getThumbUrl = async fileId => {
  try {
    const file = await directusClient.getItem("directus_files", fileId)
    const mediumThumb = file.data.data.thumbnails.find(t => t.key === "directus-medium-crop")
    const thumb = (mediumThumb && mediumThumb.url) || file.data.data.full_url
    return thumb
  } catch {
    return null
  }
}

export const isLoggedIn = async () => {
  return (await directusClient.isLoggedIn())
}

export const authenticate = async (email, password) => {
  await directusClient.login({ email, password })
  const { data: user } = await directusClient.getMe()

  // save current auth token
  window.localStorage.setItem(StorageKeys.token, user.token)

  // save user basic info
  window.localStorage.setItem(StorageKeys.name, `${user.first_name || ""} ${user.last_name || ""}`.trim())
  window.localStorage.setItem(StorageKeys.email, user.email)

  if (user.avatar) {
    const thumb = await getThumbUrl(user.avatar)
    window.localStorage.setItem(StorageKeys.avatar, thumb)
  }
}

export const logout = async () => {
  await directusClient.logout()

  // clear storage
  window.localStorage.removeItem(StorageKeys.token)
  window.localStorage.removeItem(StorageKeys.name)
  window.localStorage.removeItem(StorageKeys.email)
  window.localStorage.removeItem(StorageKeys.avatar)
}
