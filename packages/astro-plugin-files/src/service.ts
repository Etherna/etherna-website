import { joinPaths } from "./utils"

export type FileService = typeof fileService
export interface FileOptions {
  src: string
  filename: string
  type: string | null
}

export const fileService = {
  getUrl(options: FileOptions) {
    const { src, filename, type } = options

    const searchParams = new URLSearchParams()
    searchParams.set("href", src)
    searchParams.set("filename", filename)
    type && searchParams.set("type", type)

    const fileEndpoint = joinPaths(import.meta.env.BASE_URL, "/_file")

    return `${fileEndpoint}?${searchParams.toString()}`
  },
  parseUrl(urlHref: string) {
    const params = urlHref.split("/").pop()
    const urlParams = new URLSearchParams(params)
    const href = urlParams.get("href")
    const filename = urlParams.get("filename")
    const type = urlParams.get("type") ?? null

    if (!href) throw new Error("Missing href parameter")

    return {
      href,
      filename,
      type,
    }
  },
}
