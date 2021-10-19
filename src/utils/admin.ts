import { CurrentUser } from "@definitions/app"
import DirectusClient from "@directus/sdk-js"

export const StorageKeys = {
  token: "auth:token",
  name: "user:name",
  email: "user:email",
  avatar: "user:avatar",
}

const token = typeof window !== "undefined"
  ? window.localStorage.getItem(StorageKeys.token) ?? ""
  : undefined

const directusClient = new DirectusClient({
  url: process.env.DIRECTUS_URL,
  project: process.env.DIRECTUS_PROJECT,
  mode: "jwt",
  token,
})

export const getCurrentUser = () => {
  if (typeof window === "undefined") return null

  const token = window.localStorage.getItem(StorageKeys.token)
  if (token == null) return null

  const user: CurrentUser = {
    name: window.localStorage.getItem(StorageKeys.name) ?? "",
    email: window.localStorage.getItem(StorageKeys.email) ?? "",
    avatar: window.localStorage.getItem(StorageKeys.avatar) ?? "",
  }

  return user
}

export const currentUserToken = () =>
  window.localStorage.getItem(StorageKeys.token)

export const getThumbUrl = async (fileId: number) => {
  try {
    const file = await directusClient.getItem<{ data: any }>("directus_files", fileId)
    const thumbs = file.data.data.thumbnails as Array<{ key: string, url: string }>
    const mediumThumb = thumbs.find(t => t.key === "directus-medium-crop")
    const thumb = (mediumThumb && mediumThumb.url) || file.data.data.full_url
    return thumb as string
  } catch {
    return null
  }
}

export const isLoggedIn = async () => {
  return (await directusClient.isLoggedIn())
}

export const authenticate = async (email: string, password: string) => {
  await directusClient.login({
    email,
    password,
    url: process.env.DIRECTUS_URL,
    project: process.env.DIRECTUS_PROJECT,
  })

  const { data: user } = await directusClient.getMe()
  directusClient.config.token = user.token

  // save current auth token
  window.localStorage.setItem(StorageKeys.token, user.token)

  // save user basic info
  window.localStorage.setItem(StorageKeys.name, `${user.first_name || ""} ${user.last_name || ""}`.trim())
  window.localStorage.setItem(StorageKeys.email, user.email)

  if (user.avatar) {
    const thumb = await getThumbUrl(user.avatar)
    thumb && window.localStorage.setItem(StorageKeys.avatar, thumb)
    !thumb && window.localStorage.removeItem(StorageKeys.avatar)
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
