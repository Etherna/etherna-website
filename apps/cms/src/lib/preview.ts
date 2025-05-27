import { env } from "@/env"

interface PreviewUrlParams {
  id: string
  locale: string
  path: string
}

export function generatePreviewUrl({ id, locale, path }: PreviewUrlParams) {
  return `${env.NEXT_PUBLIC_FRONTEND_URL}/_preview?id=${id}&path=${encodeURIComponent(path)}&lang=${locale}`
}
