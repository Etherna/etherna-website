export function generatePreviewUrl(path: string, lang: string) {
  return `${process.env.PAYLOAD_PUBLIC_FRONTEND_URL}/_preview?path=${encodeURIComponent(path)}&lang=${lang}`
}
