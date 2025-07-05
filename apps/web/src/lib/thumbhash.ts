import { thumbHashToDataURL as thtdu } from "thumbhash"

export function thumbhashToDataURL(thumbhashBase64: string) {
  return thtdu(
    typeof window === "undefined"
      ? Buffer.from(thumbhashBase64, "base64")
      : Uint8Array.from(atob(thumbhashBase64), (c) => c.charCodeAt(0)),
  )
}
